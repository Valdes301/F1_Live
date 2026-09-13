import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Tv, 
  Radio, 
  ChevronDown, 
  ChevronUp, 
  Trophy, 
  Clock, 
  Flag, 
  Timer,
  Check, 
  ExternalLink,
  FileText
} from 'lucide-react';
import { GrandPrix, Session } from '../types';
import { formatSessionDate, createGoogleCalendarUrl } from '../utils/calendarHelpers';

interface GrandPrixCardProps {
  grandPrix: GrandPrix;
  onOpenSkyNews: (gp: GrandPrix) => void;
  onOpenGridModal?: (gp: GrandPrix) => void;
  onOpenQualifyingModal?: (gp: GrandPrix) => void;
  onSessionNotify?: (gp: GrandPrix, session: Session) => void;
}

export const GrandPrixCard: React.FC<GrandPrixCardProps> = ({
  grandPrix,
  onOpenSkyNews,
  onOpenGridModal,
  onOpenQualifyingModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const raceSession = grandPrix.sessions.find(s => s.type === 'race');
  const isSaturdayRace = raceSession && new Date(raceSession.startTime).getUTCDay() === 6;

  return (
    <div 
      className={`rounded-2xl border transition-all ${
        grandPrix.status === 'completed'
          ? 'bg-slate-900/60 border-slate-800/80 opacity-80'
          : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-xl'
      }`}
      id={`gp-card-${grandPrix.id}`}
    >
      {/* Top Banner */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-red-600/20 text-red-400 border border-red-500/30 font-mono">
                Round {grandPrix.round}
              </span>

              {isSaturdayRace && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                  🏁 Gara di Sabato
                </span>
              )}

              {grandPrix.isSprintWeekend && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  ⚡ Sprint
                </span>
              )}

              {grandPrix.status === 'completed' && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                  Terminato
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white font-['Chakra_Petch']">
              {grandPrix.name}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {grandPrix.circuitName} ({grandPrix.country})
              </span>
              <span>•</span>
              <span>{grandPrix.laps} giri ({grandPrix.circuitLengthKm} km)</span>
            </div>
          </div>

          {/* Action Buttons: Griglia, Qualifiche, Winner or AI */}
          <div className="flex items-center gap-2 flex-wrap">
            {(grandPrix.startingGrid || grandPrix.sprintStartingGrid) && onOpenGridModal && (
              <button
                onClick={() => onOpenGridModal(grandPrix)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold transition-all hover:scale-105"
                title="Visualizza griglia di partenza ufficiale FIA"
              >
                <Flag className="w-3.5 h-3.5 text-red-400" />
                <span>Griglia Partenza</span>
              </button>
            )}

            {(grandPrix.startingGrid || grandPrix.sprintStartingGrid) && onOpenQualifyingModal && (
              <button
                onClick={() => onOpenQualifyingModal(grandPrix)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold transition-all hover:scale-105"
                title="Visualizza tempi qualifiche Q1, Q2, Q3"
              >
                <Timer className="w-3.5 h-3.5 text-purple-400" />
                <span>Qualifiche (Q1-Q2-Q3)</span>
              </button>
            )}

            {grandPrix.winner ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Vinto da: {grandPrix.winner.driver}</span>
              </div>
            ) : (
              <button
                onClick={() => onOpenSkyNews(grandPrix)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors"
                title="Visualizza gomme, pit stop, penalità e strategie"
              >
                <FileText className="w-3.5 h-3.5 text-red-400" />
                <span>Gomme & Pit Stop</span>
              </button>
            )}
          </div>
        </div>

        {/* Sky Sport & TV8 Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="flex items-center gap-2">
            <Tv className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-slate-300">
              <strong className="text-white">Sky Sport F1:</strong> Tutte le sessioni in diretta HD & NOW
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-300">
              <strong className="text-white">TV8:</strong> {grandPrix.sessions.find(s => s.type === 'race')?.tv8Broadcast || 'Differita serale'}
            </span>
          </div>
        </div>

        {/* Special Weekend Schedule Alert (e.g., Saturday Race) */}
        {isSaturdayRace && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
            <span className="text-base leading-none">⚠️</span>
            <div>
              <strong className="font-semibold text-amber-300">Programma Speciale:</strong> Gara anticipata a <strong>Sabato {new Date(raceSession?.startTime || '').toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}</strong> (rispetto del Giorno della Memoria del 27 Settembre in Azerbaijan). Prove libere il giovedì e qualifiche il venerdì.
            </div>
          </div>
        )}

        {/* Sessions Timetable (Full Grid) */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-extrabold uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span>Programma Orari e Sessioni</span>
            <span className="text-[11px] font-normal text-slate-500">Ora Italiana (CET/CEST)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {grandPrix.sessions.map((session) => {
              const { day, time } = formatSessionDate(session.startTime);
              const gcalUrl = createGoogleCalendarUrl(grandPrix, session);

              return (
                <div 
                  key={session.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {session.name}
                      </span>
                      <span className="text-[11px] font-mono text-red-400 font-semibold">
                        {day} • {time}
                      </span>
                    </div>

                    <a
                      href={gcalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Aggiungi al tuo Google Calendar (con promemoria a 30m e 15m)"
                    >
                      <Calendar className="w-3.5 h-3.5 text-red-400" />
                    </a>
                  </div>

                  <div className="pt-1 border-t border-slate-900 text-[10px] text-slate-400 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sky-300 font-medium">Sky Sport F1</span>
                      <span className="text-emerald-400 font-bold">DIRETTA</span>
                    </div>
                    {session.tv8Broadcast && (
                      <div className="text-slate-500 truncate">
                        TV8: {session.tv8Broadcast}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collapsible Circuit Technical Data */}
        {isExpanded && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3 animate-fadeIn">
            <h4 className="font-bold text-white text-sm font-['Chakra_Petch']">
              Scheda Tecnica del Tracciato
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Lunghezza</span>
                <span className="font-bold text-white font-mono">{grandPrix.circuitLengthKm} km</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Giri Totali</span>
                <span className="font-bold text-white font-mono">{grandPrix.laps}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Distanza Gara</span>
                <span className="font-bold text-white font-mono">{grandPrix.raceDistanceKm} km</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Record Pista</span>
                <span className="font-bold text-amber-400 font-mono text-[11px] truncate block">
                  {grandPrix.lapRecord.time} ({grandPrix.lapRecord.driver})
                </span>
              </div>
            </div>
            {grandPrix.skyNotes && (
              <p className="text-slate-400 text-xs italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                "{grandPrix.skyNotes}"
              </p>
            )}
          </div>
        )}

        {/* Expand / Collapse Button */}
        <div className="pt-2 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
          >
            {isExpanded ? (
              <>Mostra meno info <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>Scheda tecnica & dettagli tracciato <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
