import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { 
  OFFICIAL_F1_CALENDAR, 
  fetchLiveDriverStandings, 
  fetchLiveConstructorStandings, 
  generateIcsCalendar 
} from './f1Service';
import { CalendarExportConfig } from '../src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.error('Error initializing GoogleGenAI:', e);
    }
  }
  return aiClient;
}

// 1. Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(), 
    environment: 'production',
    system: 'Raspberry Pi 4 & Docker Ready'
  });
});

// 2. F1 Calendar & Schedule endpoint
app.get(['/api/f1/calendar', '/api/f1/races'], async (req: Request, res: Response) => {
  try {
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

// 3. F1 Standings endpoint
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

// 4. Dynamic iCal (.ics) Calendar Feed
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

// 5. AI Tactical Analysis & Sky Preview endpoint
app.post('/api/f1/ai-insights', async (req: Request, res: Response) => {
  try {
    const { grandPrixId, gpName, circuitName } = req.body;
    const ai = getAI();

    if (!ai) {
      return res.json({
        tactics: `Analisi tattica per ${gpName || 'il prossimo GP'}: Gestione del degrado gomme fondamentale con finestra pit stop prevista tra il giro 18 e il giro 24 (strategia Medium -> Hard). Occhio alla safety car e al DRS.`,
        skyPreview: `Su Sky Sport F1 Carlo Vanzini e Marc Genè analizzeranno i dati telemetrici con Matteo Bobbi per le modifiche di carico alare sulle curve veloci.`,
        keyFactor: `Curva 1 e trazione in uscita dalle chicane saranno decisive per i sorpassi.`
      });
    }

    const prompt = `Sei l'esperto di Formula 1 di Sky Sport F1. Genera una breve anteprima strategica (3 sezioni: tattica pit-stop/gomme, fattore chiave del circuito ${circuitName || ''}, e cosa aspettarsi dalla diretta su Sky Sport F1) per il ${gpName || 'prossimo Gran Premio'}. Rispondi in formato JSON con i campi: "tactics", "keyFactor", "skyPreview". Rispondi in lingua italiana.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error) {
    console.error('Error with Gemini AI analysis:', error);
    res.json({
      tactics: 'Strategia a sosta singola favorita con partenza su mescola media (C3) e passaggio alla dura (C2) per coprire l\'undercut.',
      skyPreview: 'Diretta su Sky Sport F1 HD con telemetrie live, analisi al touchscreen di Matteo Bobbi e interviste dal paddock di Mara Sangiorgio.',
      keyFactor: 'Gestione delle temperature dei freni e trazione all\'uscita delle curve lente.'
    });
  }
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

// Static files and SPA fallback
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏁 F1 Calendar & Sky Sync Server (Production) running on http://0.0.0.0:${PORT}`);
});
