import React, { useState } from 'react';
import { 
  Flag, 
  Trophy, 
  Timer, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Flame,
  Clock,
  Sparkles,
  Layers,
  Thermometer,
  ShieldCheck
} from 'lucide-react';
import { GrandPrix, StartingGrid, StartingGridEntry } from '../types';

interface StartingGridWidgetProps {
  grandPrix: GrandPrix;
}

export const StartingGridWidget: React.FC<StartingGridWidgetProps> = ({ grandPrix }) => {
  const hasRaceGrid = !!grandPrix.startingGrid;
  const hasSprintGrid = !!grandPrix.sprintStartingGrid;

  // Default active tab to sprint if sprint grid available, else race
  const [selectedGridType, setSelectedGridType] = useState<'race' | 'sprint'>(
    grandPrix.isSprintWeekend && hasSprintGrid && !hasRaceGrid ? 'sprint' : 'race'
  );

  if (!hasRaceGrid && !hasSprintGrid) {
    return null;
  }

  const activeGrid: StartingGrid | undefined = 
    selectedGridType === 'sprint' ? grandPrix.sprintStartingGrid : grandPrix.startingGrid;

  if (!activeGrid) {
    return null;
  }

  return (
    <div 
      className="rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden animate-fadeIn"
      id="starting-grid-container"
    >
      {/* Header bar */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-600/20 text-red-400 border border-red-500/30 font-mono">
                <Flag className="w-3.5 h-3.5" />
                GRIGLIA DI PARTENZA UFFICIALE
              </span>
              
              {activeGrid.isOfficial && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  FIA CONFIRMED
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white font-['Chakra_Petch']">
              {grandPrix.name}: {selectedGridType === 'sprint' ? 'Griglia Gara Sprint' : 'Griglia Gran Premio'}
            </h3>
            
            <p className="text-xs text-slate-400">
              Schieramento e tempi cronometrati determinati al termine delle Qualifiche ufficiali.
            </p>
          </div>

          {/* Toggle between Race Grid and Sprint Grid (if sprint weekend) */}
          {grandPrix.isSprintWeekend && hasSprintGrid && hasRaceGrid && (
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs shrink-0">
              <button
                onClick={() => setSelectedGridType('race')}
                className={`px-3 py-1.5 font-bold rounded-lg transition-all ${
                  selectedGridType === 'race'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🏁 Griglia Gara
              </button>
              <button
                onClick={() => setSelectedGridType('sprint')}
                className={`px-3 py-1.5 font-bold rounded-lg transition-all ${
                  selectedGridType === 'sprint'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚡ Griglia Sprint
              </button>
            </div>
          )}

        </div>

        {/* Pole Position Spotlight Banner */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-red-500/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 font-black text-sm">
              P1
            </div>
            <div>
              <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                Pole Position Qualifiche
              </div>
              <div className="text-base sm:text-lg font-black text-white font-['Chakra_Petch']">
                {activeGrid.polePositionDriver}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 text-xs">
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase">Giro Pole</span>
              <span className="font-mono font-black text-emerald-400 text-sm">{activeGrid.polePositionTime}</span>
            </div>

            {activeGrid.trackTempC && (
              <div className="text-right hidden sm:block">
                <span className="text-slate-400 block text-[10px] uppercase">Temp. Asfalto</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{activeGrid.trackTempC}°C</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Grid Rows / Slots Table */}
      <div className="p-4 sm:p-6 space-y-3">
        <div className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between pb-1 border-b border-slate-800">
          <span>Schieramento Griglia (Fila per Fila)</span>
          <span className="hidden sm:inline text-slate-500">Miglior Crono Qualifiche • Distacco</span>
        </div>

        {/* Realistic 2-by-2 F1 Grid Layout on desktop, responsive stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {activeGrid.grid.map((entry, index) => {
            const isPole = entry.position === 1;
            const isFrontRow = entry.position <= 2;
            const isTop10 = entry.position <= 10;

            return (
              <div
                key={`${entry.driverNumber}-${entry.position}`}
                className={`p-3 sm:p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isPole
                    ? 'bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border-red-500/50 shadow-md shadow-red-950/20'
                    : isFrontRow
                    ? 'bg-slate-950 border-slate-700'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Left: Position & Driver info */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Position Badge */}
                  <div 
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      isPole 
                        ? 'bg-red-600 text-white font-mono' 
                        : isFrontRow 
                        ? 'bg-slate-800 text-white font-mono border border-slate-700' 
                        : 'bg-slate-900 text-slate-400 font-mono border border-slate-800'
                    }`}
                  >
                    {entry.position}
                  </div>

                  {/* Team color accent line */}
                  <div 
                    className="w-1.5 h-8 rounded-full shrink-0" 
                    style={{ backgroundColor: entry.teamColor || '#E80020' }} 
                  />

                  {/* Driver Name & Team */}
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
                        <span className="text-[10px] px-1.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {entry.tyreCompound}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Lap Times & Gap */}
                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-xs sm:text-sm text-white">
                    {entry.bestTime}
                  </div>
                  <div className={`text-[10px] font-mono font-semibold ${isPole ? 'text-red-400' : 'text-slate-400'}`}>
                    {entry.gapToPole || '+0.000s'}
                  </div>
                  {entry.penalty && (
                    <div className="text-[9px] text-amber-400 font-bold max-w-[140px] truncate" title={entry.penalty}>
                      ⚠️ {entry.penalty}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
