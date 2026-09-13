import React, { useState } from 'react';
import { 
  Server, 
  Copy, 
  Check, 
  Cpu, 
  HardDrive, 
  Terminal, 
  ShieldCheck, 
  ExternalLink,
  Info 
} from 'lucide-react';

export const DockerGuideModal: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const composeCode = `services:
  f1-calendar-sky:
    build: .
    image: f1-calendar-sky:latest
    container_name: f1-calendar-sky
    restart: unless-stopped
    ports:
      - "1950:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000`;

  const dockerRunCode = `docker build -t f1-calendar-sky:latest .
docker run -d \\
  --name f1-calendar-sky \\
  --restart unless-stopped \\
  -p 1950:3000 \\
  f1-calendar-sky:latest`;

  return (
    <div className="space-y-6" id="docker-guide-container">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#121c2e] to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Chakra_Petch']">
              Installazione Docker per Raspberry Pi 4
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Guida rapida per l'hosting self-hosted a basso consumo energetico (ARM64 / ARMv7 / AMD64).
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
            <span>Porta 1950 (1° GP F1 Silverstone)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Cpu className="w-4 h-4" />
            <span>Risorse CPU / RAM Illimitate</span>
          </div>
        </div>
      </div>

      {/* Quick Start Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Step 1: Docker Compose */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center font-mono">1</span>
              <h3 className="font-bold text-white text-sm sm:text-base">Avvio con Docker Compose (Consigliato)</h3>
            </div>
            <button
              onClick={() => copyToClipboard('docker compose up -d --build', 'cmd-compose')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700"
            >
              {copiedSection === 'cmd-compose' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSection === 'cmd-compose' ? 'Copiato' : 'Copia Comando'}
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Crea la cartella sul tuo Raspberry Pi 4 e avvia il container in background:
          </p>

          <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
            <code>docker compose up -d --build</code>
          </pre>

          <div className="relative pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-slate-400">File docker-compose.yml:</span>
              <button
                onClick={() => copyToClipboard(composeCode, 'file-compose')}
                className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
              >
                {copiedSection === 'file-compose' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                Copia configurazione
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-48">
              <code>{composeCode}</code>
            </pre>
          </div>
        </div>

        {/* Step 2: Docker CLI Direct */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-200 font-black text-xs flex items-center justify-center font-mono">2</span>
              <h3 className="font-bold text-white text-sm sm:text-base">Avvio con Docker CLI Standard</h3>
            </div>
            <button
              onClick={() => copyToClipboard(dockerRunCode, 'cmd-run')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700"
            >
              {copiedSection === 'cmd-run' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSection === 'cmd-run' ? 'Copiato' : 'Copia'}
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Costruisci ed esegui direttamente con il demone Docker di Raspberry Pi:
          </p>

          <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <code>{dockerRunCode}</code>
          </pre>

          {/* Verification & Access */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-red-500" />
              Accesso e Verifica su RPi 4
            </div>
            <p className="text-slate-400 text-[11px]">
              Una volta avviato, apri nel browser il tuo Raspberry Pi all'indirizzo:
            </p>
            <div className="p-2 rounded-lg bg-slate-900 font-mono text-sky-400 text-xs border border-slate-800 flex items-center justify-between">
              <span>http://raspberrypi.local:1950</span>
              <span className="text-[10px] text-amber-400 font-semibold">Anno 1° GP (1950)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Raspberry Pi 4 Specific Tips */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h4 className="font-bold text-white text-sm flex items-center gap-2 font-['Chakra_Petch']">
          <Info className="w-4 h-4 text-amber-400" />
          Configurazione e Prestazioni Hardware
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-bold text-emerald-400 block mb-1">CPU & RAM Illimitate</span>
            <p className="text-slate-400 text-[11px]">
              Tutti i limiti di memoria e throttling CPU sono stati rimossi per garantire la massima reattività su ogni sessione e query iCal.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-bold text-sky-400 block mb-1">Auto-Restart Attivo</span>
            <p className="text-slate-400 text-[11px]">
              La policy <code>restart: unless-stopped</code> riavvia l'app automaticamente in caso di riavvio del server o blackout.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-bold text-purple-400 block mb-1">Webcal Local LAN</span>
            <p className="text-slate-400 text-[11px]">
              Iscriviti al feed calendario sulla rete locale tramite l'IP del tuo dispositivo (es. <code>webcal://192.168.1.50:1950/api/f1/calendar.ics</code>).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
