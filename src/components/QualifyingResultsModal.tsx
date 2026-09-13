import React, { useState } from 'react';
import { 
  X, 
  Flag, 
  ShieldCheck, 
  Trophy, 
  Timer, 
  Sparkles, 
  Layers,
  Clock,
  ArrowDown
} from 'lucide-react';
import { GrandPrix, StartingGrid, StartingGridEntry } from '../types';

interface QualifyingResultsModalProps {
  grandPrix: GrandPrix | null;
  isOpen: boolean;
  onClose: () => void;
  onSwitchToGrid?: () => void;
}

export const QualifyingResultsModal: React.FC<QualifyingResultsModalProps> = ({
  grandPrix,
  isOpen,
  onClose,
  onSwitchToGrid,
}) => {
  if (!isOpen || !grandPrix) return null;

  const hasRaceGrid = !!grandPrix.startingGrid;
  const hasSprintGrid = !!grandPrix.sprintStartingGrid;

  const [activeSession, setActiveSession] = useState<'quali' | 'sprint_quali'>(
    grandPrix.isSprintWeekend && hasSprintGrid && !hasRaceGrid ? 'sprint_quali' : 'quali'
  );

  const activeGrid: StartingGrid | undefined =
    activeSession === 'sprint_quali' ? grandPrix.sprintStartingGrid : grandPrix.startingGrid;

  // Split into Q1, Q2, Q3 eliminators
  const q3Drivers = activeGrid?.grid.slice(0, 10) || [];
  const q2Drivers = activeGrid?.grid.slice(10, 15) || [];
  const q1Drivers = activeGrid?.grid.slice(15) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Compact on mobile */}
        <div className="p-3 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-2 sm:gap-4 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-purple-600/20 text-purple-400 border border-purple-500/30 font-mono whitespace-nowrap">
                <Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                QUALIFICHE (Q1 • Q2 • Q3)
              </span>
              {activeGrid?.isOfficial && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                  <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  UFFICIALE
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-xl font-black text-white font-['Chakra_Petch'] mt-0.5 truncate">
              {grandPrix.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400 truncate">
              Pole: <strong className="text-white">{activeGrid?.polePositionDriver || 'In attesa'} ({activeGrid?.polePositionTime || '--:--.---'})</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
            title="Chiudi"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Toggle Subheader - Compact */}
        <div className="px-3 sm:px-6 py-1.5 sm:py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
          {grandPrix.isSprintWeekend && hasSprintGrid && hasRaceGrid ? (
            <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] sm:text-xs">
              <button
                onClick={() => setActiveSession('quali')}
                className={`px-2 py-1 font-bold rounded-md transition-all ${
                  activeSession === 'quali'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⏱️ GP
              </button>
              <button
                onClick={() => setActiveSession('sprint_quali')}
                className={`px-2 py-1 font-bold rounded-md transition-all ${
                  activeSession === 'sprint_quali'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚡ Sprint Shootout
              </button>
            </div>
          ) : (
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium truncate">
              Qualifica ad Eliminazione
            </span>
          )}

          {onSwitchToGrid && (
            <button
              onClick={onSwitchToGrid}
              className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-red-600/90 hover:bg-red-500 text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm shrink-0 whitespace-nowrap"
            >
              <Flag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Griglia Partenza</span>
            </button>
          )}
        </div>

        {/* Table of Qualifying Times */}
        <div className="p-3 sm:p-6 overflow-y-auto space-y-4">
          {activeGrid ? (
            <>
              {/* Q3 Segment: Top 10 Shootout */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-2 py-1 bg-purple-950/40 border border-purple-500/30 rounded-xl text-xs font-bold text-purple-300">
                  <span className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    Q3 • TOP 10 SHOOTOUT (POLE & PRIME 5 FILE)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Gomma Soft</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                        <th className="py-2 px-3">Pos</th>
                        <th className="py-2 px-3">Pilota</th>
                        <th className="py-2 px-3">Scuderia</th>
                        <th className="py-2 px-3 text-right">Q1</th>
                        <th className="py-2 px-3 text-right">Q2</th>
                        <th className="py-2 px-3 text-right text-purple-400">Q3 (Best)</th>
                        <th className="py-2 px-3 text-right">Distacco</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {q3Drivers.map((entry) => (
                        <tr 
                          key={entry.driverNumber}
                          className={`hover:bg-slate-800/40 transition-colors ${
                            entry.position === 1 ? 'bg-purple-950/20 font-bold' : ''
                          }`}
                        >
                          <td className="py-2.5 px-3">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-black ${
                              entry.position === 1 
                                ? 'bg-purple-600 text-white' 
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {entry.position}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-sans font-black text-white">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-4 rounded-full" style={{ backgroundColor: entry.teamColor || '#E80020' }} />
                              <span>{entry.driverName}</span>
                              <span className="text-slate-500 text-[10px]">#{entry.driverNumber}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-sans text-slate-400">{entry.team}</td>
                          <td className="py-2.5 px-3 text-right text-slate-400">{entry.q1Time || '-'}</td>
                          <td className="py-2.5 px-3 text-right text-slate-400">{entry.q2Time || '-'}</td>
                          <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">{entry.q3Time || entry.bestTime}</td>
                          <td className="py-2.5 px-3 text-right text-purple-400">{entry.gapToPole || 'POLE'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Q2 Segment: Eliminati in Q2 (P11 - P15) */}
              {q2Drivers.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between px-2 py-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <ArrowDown className="w-4 h-4 text-amber-400" />
                      ELIMINATI IN Q2 (POSIZIONI 11 - 15)
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">Fuori per Q3</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {q2Drivers.map((entry) => (
                          <tr key={entry.driverNumber} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-2.5 px-3 w-12">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-800/80 text-slate-400 text-xs font-bold">
                                {entry.position}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-sans font-bold text-slate-200">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-4 rounded-full" style={{ backgroundColor: entry.teamColor || '#E80020' }} />
                                <span>{entry.driverName}</span>
                                <span className="text-slate-500 text-[10px]">#{entry.driverNumber}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 font-sans text-slate-400">{entry.team}</td>
                            <td className="py-2.5 px-3 text-right text-slate-400">{entry.q1Time || '-'}</td>
                            <td className="py-2.5 px-3 text-right text-white font-bold">{entry.q2Time || entry.bestTime}</td>
                            <td className="py-2.5 px-3 text-right text-slate-500">-</td>
                            <td className="py-2.5 px-3 text-right text-slate-400">{entry.gapToPole}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Q1 Segment: Eliminati in Q1 (P16 - P20) */}
              {q1Drivers.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between px-2 py-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <ArrowDown className="w-4 h-4 text-red-400" />
                      ELIMINATI IN Q1 (POSIZIONI 16 - 20)
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">107% Rule OK</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {q1Drivers.map((entry) => (
                          <tr key={entry.driverNumber} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-2.5 px-3 w-12">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-900 text-slate-500 text-xs font-bold">
                                {entry.position}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-sans font-semibold text-slate-300">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-4 rounded-full" style={{ backgroundColor: entry.teamColor || '#E80020' }} />
                                <span>{entry.driverName}</span>
                                <span className="text-slate-500 text-[10px]">#{entry.driverNumber}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 font-sans text-slate-400">{entry.team}</td>
                            <td className="py-2.5 px-3 text-right text-white font-bold">{entry.q1Time || entry.bestTime}</td>
                            <td className="py-2.5 px-3 text-right text-slate-500">-</td>
                            <td className="py-2.5 px-3 text-right text-slate-500">-</td>
                            <td className="py-2.5 px-3 text-right text-slate-400">{entry.gapToPole}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <p className="text-sm font-bold text-white">Qualifiche non ancora disputate.</p>
              <p className="text-xs">I tempi cronometrati ufficiali FIA verranno aggiornati in tempo reale al termine delle tre manche.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>Sky Sport F1 HD (Ch. 207) • Replay & Highlights Qualifiche disponibili</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
          >
            Chiudi
          </button>
        </div>

      </div>
    </div>
  );
};
