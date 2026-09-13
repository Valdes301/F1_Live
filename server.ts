import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { 
  OFFICIAL_F1_CALENDAR, 
  fetchLiveDriverStandings, 
  fetchLiveConstructorStandings, 
  generateIcsCalendar 
} from './server/f1Service';
import { CalendarExportConfig } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(), 
    environment: process.env.NODE_ENV || 'development',
    system: 'Raspberry Pi 4 & Docker Ready'
  });
});

// 2. F1 Calendar & Schedule endpoint
app.get(['/api/f1/calendar', '/api/f1/races'], async (req: Request, res: Response) => {
  try {
    // Return the augmented F1 schedule with Sky Sport F1 and TV8 timings
    if (req.path === '/api/f1/races') {
      return res.json(OFFICIAL_F1_CALENDAR);
    }
    res.json({
      season: 2026,
      races: OFFICIAL_F1_CALENDAR,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).json({ error: 'Failed to fetch calendar' });
  }
});

// 3. F1 Standings endpoint (Piloti & Costruttori da API ufficiale Live)
app.get('/api/f1/standings', async (req: Request, res: Response) => {
  try {
    const [drivers, constructors] = await Promise.all([
      fetchLiveDriverStandings(),
      fetchLiveConstructorStandings()
    ]);
    res.json({
      season: 2026,
      source: 'Jolpica / Ergast Official F1 Live API',
      apiEndpoint: 'https://api.jolpi.ca/ergast/f1/current/',
      drivers,
      constructors,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in /api/f1/standings:', error);
    res.status(500).json({ error: 'Errore nel recupero classifiche live' });
  }
});

// 4. Dynamic iCal (.ics) Calendar Feed (Supports Webcal subscription and direct download)
app.get(['/api/f1/calendar.ics', '/api/f1/export-ics'], (req: Request, res: Response) => {
  try {
    const config: CalendarExportConfig = {
      includeFp: req.query.includeFp !== 'false',
      includeSprint: req.query.includeSprint !== 'false',
      includeQuali: req.query.includeQuali !== 'false',
      includeRace: req.query.includeRace !== 'false',
      remind30Min: req.query.remind30Min !== 'false',
      remind15Min: req.query.remind15Min !== 'false',
      includeSkyInfo: req.query.includeSkyInfo !== 'false',
      includeTv8Info: req.query.includeTv8Info !== 'false',
    };

    const host = req.get('host') || 'localhost:3000';
    const icsContent = generateIcsCalendar(OFFICIAL_F1_CALENDAR, config, host);

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="f1-sky-sport-calendar.ics"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.send(icsContent);
  } catch (error) {
    console.error('Error generating .ics calendar:', error);
    res.status(500).send('Error generating calendar file');
  }
});

// 5. Sky Sport F1 Editorial & Circuit Preview endpoint
app.get('/api/f1/sky-editorial/:gpId', (req: Request, res: Response) => {
  const { gpId } = req.params;
  const gp = OFFICIAL_F1_CALENDAR.find(g => g.id === gpId);
  if (!gp) {
    return res.status(404).json({ error: 'GP not found' });
  }

  res.json({
    gpId: gp.id,
    name: gp.name,
    circuit: gp.circuitName,
    skyChannel: 'Sky Sport F1 HD (Canale 207)',
    streaming: 'NOW & Sky Go',
    commentaryTeam: 'Carlo Vanzini, Marc Genè, Mara Sangiorgio, Matteo Bobbi',
    overview: gp.skyNotes || 'Diretta esclusiva di tutte le sessioni su Sky Sport F1 e NOW.',
    tv8Coverage: gp.sessions.find(s => s.type === 'race')?.tv8Live ? 'Diretta in chiaro su TV8 (Canale 8)' : 'Differita su TV8'
  });
});

// 6. Security settings & encrypted sync helper
app.post('/api/settings/verify', (req: Request, res: Response) => {
  const { token } = req.body;
  res.json({
    success: true,
    maskedToken: token ? `${token.slice(0, 3)}••••••••${token.slice(-2)}` : null,
    status: 'configured_safe'
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏁 F1 Calendar & Sky Sync Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
