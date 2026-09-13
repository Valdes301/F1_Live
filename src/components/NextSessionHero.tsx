import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Tv, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Flame,
  CloudSun,
  Timer,
  Share2,
  BellRing,
  AlertTriangle,
  Flag,
  FileText
} from 'lucide-react';
import { GrandPrix, Session } from '../types';
import { getTimeRemaining, formatSessionDate, createGoogleCalendarUrl } from '../utils/calendarHelpers';

interface NextSessionHeroProps {
  grandPrix: GrandPrix;
  allGrandPrixList?: GrandPrix[];
  onSelectGrandPrix?: (gpId: string) => void;
  onOpenSyncModal: () => void;
  onOpenSkyNews: (gp: GrandPrix) => void;
  onOpenNotificationModal: () => void;
  onOpenGridModal?: (gp: GrandPrix) => void;
  onOpenQualifyingModal?: (gp: GrandPrix) => void;
}

export const NextSessionHero: React.FC<NextSessionHeroProps> = ({
  grandPrix,
  allGrandPrixList = [],
  onSelectGrandPrix,
  onOpenSyncModal,
  onOpenSkyNews,
  onOpenNotificationModal,
  onOpenGridModal,
  onOpenQualifyingModal,
}) => {
  // Find current or upcoming session in this GP
  const now = Date.now();
  const nextSession = grandPrix.sessions.find(s => new Date(s.endTime).getTime() > now) || grandPrix.sessions[grandPrix.sessions.length - 1];
  const raceSession = grandPrix.sessions.find(s => s.type === 'race') || grandPrix.sessions[grandPrix.sessions.length - 1];

  const targetSession = nextSession || raceSession;
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetSession.startTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetSession.startTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetSession.startTime]);

  const formattedTargetDate = formatSessionDate(targetSession.startTime);
  const isCurrentlyLive = new Date(targetSession.startTime).getTime() <= now && new Date(targetSession.endTime).getTime() >= now;

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-[#131b26] to-[#0a0f16] border border-slate-800 shadow-2xl">
      
      {/* Background motorsport grid aura */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative p-4 sm:p-6 lg:p-8">
        
        {/* Top bar with quick GP selector and Live tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-slate-800/80">
          
          <div className="flex flex-wrap items-center gap-2">
            {isCurrentlyLive ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/50">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                ORA IN DIRETTA F1
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                PROSSIMO GRAN PREMIO IN PROGRAMMA
              </span>
            )}

            {grandPrix.isSprintWeekend && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ⚡ FORMAT SPRINT WEEKEND
              </span>
            )}
          </div>

          {/* Quick GP Switcher Dropdown */}
          {allGrandPrixList.length > 0 && onSelectGrandPrix && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label htmlFor="gp-selector-hero" className="text-xs text-slate-400 font-medium whitespace-nowrap">
                Cambia GP:
              </label>
              <select
                id="gp-selector-hero"
                value={grandPrix.id}
                onChange={(e) => onSelectGrandPrix(e.target.value)}
                className="w-full sm:w-auto bg-slate-800/90 border border-slate-700 text-white text-xs sm:text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-sans cursor-pointer"
              >
                {allGrandPrixList.map((gp) => (
                  <option key={gp.id} value={gp.id} className="bg-slate-900 text-white">
                    Round {gp.round}: {gp.name} ({gp.city}, {gp.country})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Main Grid: Event Details + Live Countdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 sm:pt-6 items-center">
          
          {/* Left Column: GP Identity & Circuit Stats (7 cols on LG) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-red-400 font-bold uppercase tracking-wider">
                <span>Round {grandPrix.round} di {allGrandPrixList.length || 24} • Stagione {grandPrix.season}</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1 font-['Chakra_Petch'] leading-tight">
                {grandPrix.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300 mt-2 font-medium">
                <span className="flex items-center gap-1 text-slate-200">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  {grandPrix.circuitName} ({grandPrix.city})
                </span>
                
                {grandPrix.weather && (
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300">
                    <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                    {grandPrix.weather.tempC}°C • {grandPrix.weather.condition}
                  </span>
                )}
              </div>
            </div>

            {/* Sky Sport F1 Focus Box */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-inner space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-xs font-bold text-white">
                  <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                  Diretta TV: Sky Sport F1 (Canale 207 HD) & Streaming NOW
                </span>
                <span className="px-2 py-0.5 text-[10px] font-black rounded bg-red-500/20 text-red-400 border border-red-500/30">
                  DIRETTA SKY HD
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {grandPrix.skyNotes || 'Tutte le sessioni live con telecronaca di Carlo Vanzini, commento tecnico di Marc Genè e Roberto Chinchero.'}
              </p>
              {targetSession.tv8Broadcast && (
                <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold pt-1 border-t border-slate-800">
                  <Tv className="w-3.5 h-3.5 shrink-0" />
                  <span>TV8 Digitale Terrestre: {targetSession.tv8Broadcast}</span>
                </div>
              )}
            </div>

            {/* Quick Circuit Specs Pill List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Lunghezza Tracciato</span>
                <span className="font-bold text-white text-sm">{grandPrix.circuitLengthKm} km</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Giri di Gara</span>
                <span className="font-bold text-white text-sm">{grandPrix.laps} Giri ({grandPrix.raceDistanceKm} km)</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Giro Record</span>
                <span className="font-bold text-red-400 text-sm">{grandPrix.lapRecord.time}</span>
                <span className="text-[10px] text-slate-400 block truncate">({grandPrix.lapRecord.driver}, {grandPrix.lapRecord.year})</span>
              </div>
            </div>

          </div>

          {/* Right Column: Countdown Box & Instant Calendar Sync (5 cols on LG) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Target Session Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/80 shadow-xl text-center space-y-3">
              
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider">
                <Timer className="w-4 h-4" />
                <span>Prossima Sessione: {targetSession.name}</span>
              </div>

              <div className="text-sm sm:text-base font-bold text-white capitalize">
                {formattedTargetDate.dayOfWeek} {formattedTargetDate.dateNum}
              </div>

              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                Ore {formattedTargetDate.time} (Ora Italiana)
              </div>

              {/* Countdown Ticking Cards */}
              {!timeLeft.isPast ? (
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 pt-2">
                  <div className="p-2 sm:p-3 rounded-xl bg-slate-800/90 border border-slate-700/80">
                    <span className="block text-xl sm:text-2xl font-black text-white font-mono">{timeLeft.days}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Giorni</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-slate-800/90 border border-slate-700/80">
                    <span className="block text-xl sm:text-2xl font-black text-white font-mono">{timeLeft.hours}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Ore</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-slate-800/90 border border-slate-700/80">
                    <span className="block text-xl sm:text-2xl font-black text-white font-mono">{timeLeft.minutes}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Minuti</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-slate-800/90 border border-slate-700/80">
                    <span className="block text-xl sm:text-2xl font-black text-red-400 font-mono">{timeLeft.seconds}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Sec</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  🟢 Sessione conclusa o attualmente in corso sulla pista!
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <a
                  id="btn-hero-gcal"
                  href={createGoogleCalendarUrl(grandPrix, targetSession)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-red-600/30 border border-red-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Aggiungi a Google Calendar</span>
                </a>

                <button
                  id="btn-hero-sync-modal"
                  onClick={onOpenSyncModal}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold border border-slate-700 transition-all min-h-[44px] flex items-center justify-center gap-1.5"
                  title="Esporta calendario completo iCal con promemoria 30m e 15m"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Esporta iCal</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <BellRing className="w-3.5 h-3.5 text-red-400" />
                <span>Promemoria automatici 30 min e 15 min prima inclusi nel file</span>
              </div>

            </div>

            {/* Starting Grid & Qualifying Quick Buttons & AI Assistant Trigger */}
            <div className="space-y-2">
              {(grandPrix.startingGrid || grandPrix.sprintStartingGrid) && (
                <div className="grid grid-cols-2 gap-2">
                  {onOpenGridModal && (
                    <button
                      id="btn-hero-grid-modal"
                      onClick={() => onOpenGridModal(grandPrix)}
                      className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold transition-all hover:scale-[1.02] min-h-[42px]"
                    >
                      <Flag className="w-4 h-4 text-red-400" />
                      <span>Griglia Partenza</span>
                    </button>
                  )}

                  {onOpenQualifyingModal && (
                    <button
                      id="btn-hero-quali-modal"
                      onClick={() => onOpenQualifyingModal(grandPrix)}
                      className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-all hover:scale-[1.02] min-h-[42px]"
                    >
                      <Timer className="w-4 h-4 text-purple-400" />
                      <span>Scheda Qualifiche</span>
                    </button>
                  )}
                </div>
              )}

              {/* Sky Sport F1 Guide Trigger */}
              <button
                id="btn-hero-sky-analysis"
                onClick={() => onOpenSkyNews(grandPrix)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/30 hover:border-red-500/60 text-left transition-all group min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Dossier GP & Info Sky Sport F1</div>
                    <div className="text-[11px] text-slate-400">Squadra telecronaca, canale 207, record pista e TV8</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
