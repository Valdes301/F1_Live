import React, { useState } from 'react';
import { 
  X, 
  Flag, 
  ShieldCheck, 
  Trophy, 
  Timer, 
  Zap, 
  Thermometer, 
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { GrandPrix, StartingGrid } from '../types';

interface StartingGridModalProps {
  grandPrix: GrandPrix | null;
  isOpen: boolean;
  onClose: () => void;
  onSwitchToQualifying?: () => void;
}

export const StartingGridModal: React.FC<StartingGridModalProps> = ({
  grandPrix,
  isOpen,
  onClose,
  onSwitchToQualifying,
}) => {
  if (!isOpen || !grandPrix) return null;

  const hasRaceGrid = !!grandPrix.startingGrid;
  const hasSprintGrid = !!grandPrix.sprintStartingGrid;

  const [gridType, setGridType] = useState<'race' | 'sprint'>(
    grandPrix.isSprintWeekend && hasSprintGrid && !hasRaceGrid ? 'sprint' : 'race'
  );

  const activeGrid: StartingGrid | undefined =
    gridType === 'sprint' ? grandPrix.sprintStartingGrid : grandPrix.startingGrid;

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
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-red-600/20 text-red-400 border border-red-500/30 font-mono whitespace-nowrap">
                <Flag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                GRIGLIA FIA
              </span>
              {activeGrid?.isOfficial && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                  <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  CONFERMATO
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-xl font-black text-white font-['Chakra_Petch'] mt-0.5 truncate">
              {grandPrix.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400 truncate">
              {grandPrix.circuitName} • {grandPrix.laps} giri ({grandPrix.raceDistanceKm} km)
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

        {/* Modal Subheader / Toggle Tabs & Switch to Quali - Compact */}
        <div className="px-3 sm:px-6 py-1.5 sm:py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
          {grandPrix.isSprintWeekend && hasSprintGrid && hasRaceGrid ? (
            <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] sm:text-xs">
              <button
                onClick={() => setGridType('race')}
                className={`px-2 py-1 font-bold rounded-md transition-all ${
                  gridType === 'race'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🏁 GP
              </button>
              <button
                onClick={() => setGridType('sprint')}
                className={`px-2 py-1 font-bold rounded-md transition-all ${
                  gridType === 'sprint'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚡ Sprint
              </button>
            </div>
          ) : (
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium truncate">
              Schieramento Fila per Fila
            </span>
          )}

          {onSwitchToQualifying && (
            <button
              onClick={onSwitchToQualifying}
              className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-purple-600/90 hover:bg-purple-500 text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm shrink-0 whitespace-nowrap"
            >
              <Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Tempi Qualifiche</span>
            </button>
          )}
        </div>

        {/* Content Body: Pole Banner & Drivers List */}
        <div className="p-3 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4">
          {activeGrid ? (
            <>
              {/* Pole Position Spotlight - Ultra Compact on Mobile */}
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-950/50 via-slate-950 to-slate-950 border border-red-500/40 flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-red-600 text-white font-black text-sm sm:text-lg flex items-center justify-center shadow-md shadow-red-600/30 shrink-0">
                    P1
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] sm:text-[11px] font-bold text-red-400 uppercase tracking-wider truncate">
                      Pole Position Ufficiale
                    </div>
                    <div className="text-sm sm:text-lg font-black text-white font-['Chakra_Petch'] truncate">
                      {activeGrid.polePositionDriver}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono">
                  <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-sans">Miglior Crono</span>
                  <span className="text-emerald-400 font-black text-xs sm:text-base">{activeGrid.polePositionTime}</span>
                </div>
              </div>

              {/* Grid 2-column list */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between pb-1 border-b border-slate-800">
                  <span>Schieramento Griglia (Fila per Fila)</span>
                  <span className="text-slate-500">Miglior Tempo • Distacco</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {activeGrid.grid.map((entry) => {
                    const isPole = entry.position === 1;
                    const isFrontRow = entry.position <= 2;

                    return (
                      <div
                        key={`${entry.driverNumber}-${entry.position}`}
                        className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          isPole
                            ? 'bg-gradient-to-r from-red-950/40 via-slate-950 to-slate-950 border-red-500/50 shadow-md shadow-red-950/20'
                            : isFrontRow
                            ? 'bg-slate-950 border-slate-700'
                            : 'bg-slate-950/80 border-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div 
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                              isPole 
                                ? 'bg-red-600 text-white font-mono' 
                                : isFrontRow 
                                ? 'bg-slate-800 text-white font-mono border border-slate-700' 
                                : 'bg-slate-900 text-slate-400 font-mono border border-slate-800'
                            }`}
                          >
                            {entry.position}
                          </div>

                          <div 
                            className="w-1.5 h-7 rounded-full shrink-0" 
                            style={{ backgroundColor: entry.teamColor || '#E80020' }} 
                          />

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs font-bold text-slate-400">#{entry.driverNumber}</span>
                              <span className="font-black text-sm text-white truncate font-['Chakra_Petch']">
                                {entry.driverName}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                              <span>{entry.team}</span>
                              {entry.tyreCompound && (
                                <span className="text-[10px] px-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                  {entry.tyreCompound}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-mono font-bold text-xs sm:text-sm text-white">
                            {entry.bestTime}
                          </div>
                          <div className={`text-[10px] font-mono font-semibold ${isPole ? 'text-red-400' : 'text-slate-400'}`}>
                            {entry.gapToPole || '+0.000s'}
                          </div>
                          {entry.penalty && (
                            <div className="text-[9px] text-amber-400 font-bold max-w-[130px] truncate" title={entry.penalty}>
                              ⚠️ {entry.penalty}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <p className="text-sm font-bold text-white">Griglia non ancora definita.</p>
              <p className="text-xs">I tempi cronometrati e la griglia ufficiale FIA verranno inseriti al termine delle Qualifiche.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>Sky Sport F1 HD (Ch. 207) • Diretta Live Schieramento & Semaforo</span>
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
