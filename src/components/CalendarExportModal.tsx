import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Download, 
  Copy, 
  Check, 
  Radio, 
  Bell, 
  Tv, 
  ExternalLink, 
  Sparkles,
  Smartphone,
  Laptop,
  FileSpreadsheet,
  Layers,
  HelpCircle
} from 'lucide-react';
import { GrandPrix, CalendarExportConfig } from '../types';
import { 
  getCalendarFeedUrl, 
  getGoogleCalendarSubscribeUrl, 
  generateGoogleCalendarCsv, 
  downloadFile 
} from '../utils/calendarHelpers';

interface CalendarExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CalendarExportConfig;
  setConfig: React.Dispatch<React.SetStateAction<CalendarExportConfig>>;
  races?: GrandPrix[];
}

export const CalendarExportModal: React.FC<CalendarExportModalProps> = ({
  isOpen,
  onClose,
  config,
  setConfig,
  races = [],
}) => {
  const [copiedWebcal, setCopiedWebcal] = useState(false);
  const [copiedHttps, setCopiedHttps] = useState(false);
  const [activeTab, setActiveTab] = useState<'methods' | 'settings'>('methods');

  if (!isOpen) return null;

  const webcalUrl = getCalendarFeedUrl(config, 'webcal');
  const httpsUrl = getCalendarFeedUrl(config, 'https');
  const gcalSubscribeUrl = getGoogleCalendarSubscribeUrl(config);

  const handleCopyWebcal = () => {
    navigator.clipboard.writeText(webcalUrl);
    setCopiedWebcal(true);
    setTimeout(() => setCopiedWebcal(false), 2500);
  };

  const handleCopyHttps = () => {
    navigator.clipboard.writeText(httpsUrl);
    setCopiedHttps(true);
    setTimeout(() => setCopiedHttps(false), 2500);
  };

  const handleDownloadIcs = () => {
    window.open(httpsUrl, '_blank');
  };

  const handleDownloadCsv = () => {
    const csvContent = generateGoogleCalendarCsv(races, config);
    downloadFile('f1-2026-google-calendar.csv', csvContent, 'text/csv;charset=utf-8;');
  };

  const handleDirectGoogleCalendarSubscribe = () => {
    window.open(gcalSubscribeUrl, '_blank');
  };

  const handleGoogleImportSettingsPage = () => {
    // Direct link to Google Calendar Web settings import page
    window.open('https://calendar.google.com/calendar/u/0/r/settings/export', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-7 max-h-[90vh] overflow-y-auto space-y-5"
        id="calendar-sync-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          id="btn-close-sync-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-['Chakra_Petch']">
              Esporta & Sincronizza Calendario F1
            </h2>
            <p className="text-xs text-slate-400">
              Scegli il metodo che preferisci per il tuo dispositivo (Google Calendar, CSV, Apple, Outlook o file .ics).
            </p>
          </div>
        </div>

        {/* Top Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('methods')}
            className={`flex-1 py-2 font-bold rounded-lg transition-all ${
              activeTab === 'methods'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Opzioni di Aggiunta al Calendario
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 font-bold rounded-lg transition-all ${
              activeTab === 'settings'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Filtra Sessioni & Allarmi 30/15m
          </button>
        </div>

        {activeTab === 'methods' ? (
          <div className="space-y-4">
            
            {/* OPTION 1: Google Calendar Web Subscription */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                    Google
                  </span>
                  <h3 className="font-bold text-white text-sm">
                    Metodo 1: Sottoscrizione Web Google Calendar
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </div>

              <p className="text-xs text-slate-300">
                Apre Google Calendar web con il link del calendario F1 pronto all'iscrizione.
              </p>

              <button
                onClick={handleDirectGoogleCalendarSubscribe}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/20 border border-red-500/30 transition-all min-h-[42px]"
                id="btn-gcal-live-sub"
              >
                <Calendar className="w-4 h-4" />
                <span>Apri e Iscriviti su Google Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* OPTION 2: Download CSV for Google Calendar */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    100% Funzionante
                  </span>
                  <h3 className="font-bold text-white text-sm">
                    Metodo 2: File CSV per Google Calendar (Importazione Diretta)
                  </h3>
                </div>
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              </div>

              <p className="text-xs text-slate-400">
                Se la sottoscrizione web non carica gli eventi sul tuo smartphone o account, scarica il <strong>file CSV</strong> e importalo nelle impostazioni di Google Calendar: crea tutti i 24 GP istantaneamente sul tuo account!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleDownloadCsv}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all min-h-[40px]"
                  id="btn-download-csv-file"
                >
                  <Download className="w-4 h-4" />
                  <span>Scarica File CSV (Google)</span>
                </button>

                <button
                  onClick={handleGoogleImportSettingsPage}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all min-h-[40px]"
                >
                  <ExternalLink className="w-4 h-4 text-sky-400" />
                  <span>Apri Pagina Import di Google</span>
                </button>
              </div>
            </div>

            {/* OPTION 3: Download .ICS or Webcal for Apple/Outlook/Android */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-sky-400" />
                  Metodo 3: File Standard iCalendar (.ics) o Webcal
                </h3>
              </div>

              <p className="text-xs text-slate-400">
                Compatibile con Apple Calendar (iPhone/Mac), Outlook, Thunderbird o qualsiasi app calendario nativa.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={handleDownloadIcs}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all min-h-[40px]"
                  id="btn-download-ics-file"
                >
                  <Download className="w-4 h-4" />
                  Scarica File .ics Completo
                </button>

                <a
                  href={webcalUrl}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all min-h-[40px]"
                  id="btn-apple-live-sub"
                >
                  <Smartphone className="w-4 h-4 text-sky-400" />
                  Apri con Apple / Outlook
                </a>

                <button
                  onClick={handleCopyWebcal}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 min-h-[40px]"
                >
                  {copiedWebcal ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedWebcal ? 'Copiato!' : 'Copia Link Webcal'}
                </button>
              </div>

              {/* URL Display */}
              <div className="pt-2">
                <input
                  type="text"
                  readOnly
                  value={webcalUrl}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[11px] font-mono text-slate-400 select-all"
                />
              </div>
            </div>

          </div>
        ) : (
          /* Customization & Preferences Toggles */
          <div className="space-y-4 pt-1">
            <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2 font-['Chakra_Petch']">
              <Bell className="w-4 h-4 text-red-500" />
              Personalizzazione Sessioni e Promemoria
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Session Toggles */}
              <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={config.includeRace}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeRace: e.target.checked }))}
                  className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
                />
                <span className="font-semibold text-slate-200">Gare Grand Prix (Domenica)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={config.includeQuali}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeQuali: e.target.checked }))}
                  className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
                />
                <span className="font-semibold text-slate-200">Qualifiche Ufficiali</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={config.includeSprint}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeSprint: e.target.checked }))}
                  className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
                />
                <span className="font-semibold text-slate-200">Sessioni Sprint (Quali + Gara)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={config.includeFp}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeFp: e.target.checked }))}
                  className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
                />
                <span className="font-semibold text-slate-200">Prove Libere (FP1, FP2, FP3)</span>
              </label>

              {/* Reminder Toggles */}
              <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950 border border-red-900/30 cursor-pointer hover:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={config.remind30Min}
                  onChange={(e) => setConfig(prev => ({ ...prev, remind30Min: e.target.checked }))}
                  className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
                />
                <div>
                  <span className="font-bold text-red-400 block">Promemoria 30 minuti prima</span>
                  <span className="text-[10px] text-slate-400">Allarme sonoro e notifica pre-diretta</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950 border border-red-900/30 cursor-pointer hover:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={config.remind15Min}
                  onChange={(e) => setConfig(prev => ({ ...prev, remind15Min: e.target.checked }))}
                  className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
                />
                <div>
                  <span className="font-bold text-red-400 block">Promemoria 15 minuti prima</span>
                  <span className="text-[10px] text-slate-400">Allarme inizio pit-lane e griglia</span>
                </div>
              </label>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

