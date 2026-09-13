import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  Flag, 
  RefreshCw, 
  TrendingUp, 
  Award, 
  ChevronRight, 
  Shield 
} from 'lucide-react';
import { DriverStanding, ConstructorStanding } from '../types';

interface StandingsWidgetProps {
  drivers: DriverStanding[];
  constructors: ConstructorStanding[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const StandingsWidget: React.FC<StandingsWidgetProps> = ({
  drivers,
  constructors,
  onRefresh,
  isRefreshing = false,
}) => {
  const [activeTab, setActiveTab] = useState<'drivers' | 'constructors'>('drivers');

  return (
    <div className="space-y-6" id="standings-widget-container">
      
      {/* Standings Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5 font-['Chakra_Petch']">
              <Trophy className="w-6 h-6 text-amber-400" />
              Classifiche Mondiali Formula 1 2026
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Fonte Ufficiale: Ergast / Jolpica F1 Live API (FIA)
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              • Sincronizzato con l'ultimo Gran Premio
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 flex-1 sm:flex-initial">
            <button
              onClick={() => setActiveTab('drivers')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'drivers'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              id="tab-drivers-btn"
            >
              Piloti
            </button>
            <button
              onClick={() => setActiveTab('constructors')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'constructors'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              id="tab-constructors-btn"
            >
              Costruttori
            </button>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Aggiorna classifiche in tempo reale"
              id="btn-refresh-standings"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-red-500' : ''}`} />
              <span className="hidden sm:inline">Sincronizza</span>
            </button>
          )}
        </div>
      </div>

      {/* Top 3 Podium Highlights for Drivers */}
      {activeTab === 'drivers' && drivers.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* P2 */}
          <div className="order-2 md:order-1 p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
            <div 
              className="absolute top-0 left-0 right-0 h-1.5" 
              style={{ backgroundColor: drivers[1].teamColor }} 
            />
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 font-extrabold text-sm flex items-center justify-center border border-slate-700 font-mono">
                2
              </span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                #{drivers[1].number}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{drivers[1].team}</span>
              <h3 className="text-lg font-bold text-white font-['Chakra_Petch']">{drivers[1].fullName}</h3>
              <p className="text-xs text-slate-400 mt-1">{drivers[1].wins} vittorie • {drivers[1].podiums} podi</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">-{drivers[1].pointsBehind} pts</span>
              <span className="text-xl font-extrabold text-white font-['Chakra_Petch']">{drivers[1].points} <span className="text-xs text-slate-400 font-normal">PTS</span></span>
            </div>
          </div>

          {/* P1 Leader */}
          <div className="order-1 md:order-2 p-5 rounded-2xl bg-gradient-to-b from-slate-900 via-[#231718] to-slate-950 border-2 border-amber-500/40 shadow-xl shadow-amber-500/5 relative overflow-hidden flex flex-col justify-between scale-[1.02]">
            <div 
              className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 to-yellow-600" 
            />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md font-mono">
                  1
                </span>
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> LEADER
                </span>
              </div>
              <span className="text-xs font-extrabold font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                #{drivers[0].number}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider" style={{ color: drivers[0].teamColor }}>
                {drivers[0].team}
              </span>
              <h3 className="text-xl font-black text-white font-['Chakra_Petch']">{drivers[0].fullName}</h3>
              <p className="text-xs text-amber-200/80 mt-1">{drivers[0].wins} vittorie • {drivers[0].podiums} podi</p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-semibold">Campione in Carica</span>
              <span className="text-2xl font-black text-amber-400 font-['Chakra_Petch']">{drivers[0].points} <span className="text-xs text-slate-400 font-normal">PTS</span></span>
            </div>
          </div>

          {/* P3 */}
          <div className="order-3 p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
            <div 
              className="absolute top-0 left-0 right-0 h-1.5" 
              style={{ backgroundColor: drivers[2].teamColor }} 
            />
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-full bg-amber-900/60 text-amber-200 font-extrabold text-sm flex items-center justify-center border border-amber-800/80 font-mono">
                3
              </span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                #{drivers[2].number}
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{drivers[2].team}</span>
              <h3 className="text-lg font-bold text-white font-['Chakra_Petch']">{drivers[2].fullName}</h3>
              <p className="text-xs text-slate-400 mt-1">{drivers[2].wins} vittorie • {drivers[2].podiums} podi</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">-{drivers[2].pointsBehind} pts</span>
              <span className="text-xl font-extrabold text-white font-['Chakra_Petch']">{drivers[2].points} <span className="text-xs text-slate-400 font-normal">PTS</span></span>
            </div>
          </div>
        </div>
      )}

      {/* Standings Table */}
      <div className="overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3.5 text-center w-12">Pos</th>
                {activeTab === 'drivers' ? (
                  <>
                    <th className="px-4 py-3.5">Pilota</th>
                    <th className="px-4 py-3.5 hidden sm:table-cell">Scuderia</th>
                    <th className="px-4 py-3.5 text-center hidden md:table-cell">Vittorie</th>
                    <th className="px-4 py-3.5 text-center hidden md:table-cell">Podi</th>
                    <th className="px-4 py-3.5 text-right">Punti</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3.5">Scuderia Costruttori</th>
                    <th className="px-4 py-3.5 hidden sm:table-cell">Piloti Ufficiali</th>
                    <th className="px-4 py-3.5 text-center hidden md:table-cell">Vittorie</th>
                    <th className="px-4 py-3.5 text-right">Punti Totali</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {activeTab === 'drivers' ? (
                drivers.map((driver) => (
                  <tr 
                    key={driver.driverId} 
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-4 py-3.5 text-center font-extrabold font-mono text-slate-300">
                      {driver.position <= 3 ? (
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          driver.position === 1 ? 'bg-amber-500 text-slate-950' :
                          driver.position === 2 ? 'bg-slate-700 text-slate-100' :
                          'bg-amber-900/80 text-amber-200'
                        }`}>
                          {driver.position}
                        </span>
                      ) : (
                        driver.position
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-1.5 h-6 rounded-full shrink-0" 
                          style={{ backgroundColor: driver.teamColor }} 
                        />
                        <div>
                          <div className="font-bold text-white text-sm flex items-center gap-1.5 font-['Chakra_Petch']">
                            {driver.fullName}
                            <span className="text-[10px] font-mono text-slate-400 font-normal">#{driver.number}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 sm:hidden block">{driver.team}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-300 hidden sm:table-cell font-medium">
                      {driver.team}
                    </td>
                    <td className="px-4 py-3.5 text-center text-slate-300 font-mono hidden md:table-cell">
                      {driver.wins}
                    </td>
                    <td className="px-4 py-3.5 text-center text-slate-300 font-mono hidden md:table-cell">
                      {driver.podiums}
                    </td>
                    <td className="px-4 py-3.5 text-right font-black text-white font-mono text-base">
                      {driver.points}
                    </td>
                  </tr>
                ))
              ) : (
                constructors.map((c) => (
                  <tr 
                    key={c.constructorId} 
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-4 py-3.5 text-center font-extrabold font-mono text-slate-300">
                      {c.position <= 3 ? (
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          c.position === 1 ? 'bg-amber-500 text-slate-950' :
                          c.position === 2 ? 'bg-slate-700 text-slate-100' :
                          'bg-amber-900/80 text-amber-200'
                        }`}>
                          {c.position}
                        </span>
                      ) : (
                        c.position
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-2.5 h-6 rounded-full shrink-0" 
                          style={{ backgroundColor: c.color }} 
                        />
                        <div>
                          <div className="font-bold text-white text-sm font-['Chakra_Petch']">
                            {c.name}
                          </div>
                          <span className="text-[11px] text-slate-400">{c.nationality}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-300 hidden sm:table-cell">
                      <span className="text-xs text-slate-300 bg-slate-800/70 px-2 py-1 rounded border border-slate-700">
                        {c.drivers.join(' • ')}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center text-slate-300 font-mono hidden md:table-cell">
                      {c.wins}
                    </td>
                    <td className="px-4 py-3.5 text-right font-black text-white font-mono text-base">
                      {c.points}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
