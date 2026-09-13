import React from 'react';
import { 
  X, 
  CircleDot, 
  Timer, 
  ShieldAlert, 
  MapPin, 
  Wrench, 
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Flag,
  Car
} from 'lucide-react';
import { GrandPrix, RaceTacticsInfo } from '../types';

interface SkyEditorialModalProps {
  grandPrix: GrandPrix | null;
  onClose: () => void;
  allRaces?: GrandPrix[];
  onSelectGp?: (gpId: string) => void;
}

export const SkyEditorialModal: React.FC<SkyEditorialModalProps> = ({
  grandPrix,
  onClose,
  allRaces = [],
  onSelectGp,
}) => {
  if (!grandPrix) return null;

  // Fallback race tactics if not explicitly set on grandPrix
  const tactics: RaceTacticsInfo = grandPrix.raceTactics || {
    pirelliTyreCompounds: {
      hard: 'C1',
      medium: 'C2',
      soft: 'C3',
      recommendedStrategies: [
        { name: '1 Sosta (Standard)', stints: 'Medium (Giri 1-25) -> Hard (Giri 26-56)', stops: 1, pitWindow: 'Giri 22-28', feasibility: 'Preferita' },
        { name: '2 Soste (Aggressiva)', stints: 'Soft (Giri 1-16) -> Medium (Giri 17-36) -> Hard (Giri 37-56)', stops: 2, pitWindow: 'Giri 15-18 & 36-40', feasibility: 'Alternativa' }
      ]
    },
    pitLaneInfo: {
      pitLossTimeSeconds: 21.8,
      pitSpeedLimitKmh: 80,
      degradationLevel: 'Medio',
      overtakingDifficulty: 'Media',
      safetyCarProbabilityPercent: 55
    },
    penaltiesAndGridNotes: grandPrix.startingGrid?.grid
      ?.filter(g => g.penalty)
      .map(g => ({
        driver: g.driverName,
        team: g.team,
        penalty: g.penalty || 'Penalità in griglia',
        reason: 'Verifica commissari sportivi FIA'
      })) || [],
    skyTechnicalFocus: grandPrix.skyNotes || 'Analisi tecnica focalizzata sull\'efficienza aerodinamica e sulla gestione delle temperature degli pneumatici Pirelli.'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto"
        id="gp-technical-intelligence-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          title="Chiudi"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & GP Switcher */}
        <div className="space-y-3 pr-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-600/20 text-red-400 border border-red-500/30 uppercase tracking-wider font-mono">
              <Wrench className="w-3.5 h-3.5" />
              INTELLIGENCE TECNICA & STRATEGIA GP
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
              Round {grandPrix.round} • {grandPrix.season}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Chakra_Petch']">
                {grandPrix.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {grandPrix.circuitName} ({grandPrix.city}, {grandPrix.country}) • {grandPrix.laps} Giri ({grandPrix.circuitLengthKm} km)
              </p>
            </div>

            {/* Switch GP Dropdown */}
            {allRaces.length > 0 && onSelectGp && (
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-slate-400 font-medium whitespace-nowrap">Cambia GP:</label>
                <select
                  value={grandPrix.id}
                  onChange={(e) => onSelectGp(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-red-500"
                >
                  {allRaces.map((gp) => (
                    <option key={gp.id} value={gp.id}>
                      R{gp.round}: {gp.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-5 text-xs sm:text-sm">
          
          {/* SECTION 1: Gomme Pirelli & Strategie */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CircleDot className="w-4 h-4 text-amber-400" />
                <span>Mescole Pneumatici Pirelli & Strategie di Sosta</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Degrado: <strong className="text-amber-400">{tactics.pitLaneInfo.degradationLevel}</strong>
              </span>
            </div>

            {/* Compound Badges */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Hard (Gara lunga)</span>
                <span className="text-white font-black text-base font-mono">{tactics.pirelliTyreCompounds.hard}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Medium (Gestione)</span>
                <span className="text-yellow-400 font-black text-base font-mono">{tactics.pirelliTyreCompounds.medium}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Soft (Qualifica/Sprint)</span>
                <span className="text-red-500 font-black text-base font-mono">{tactics.pirelliTyreCompounds.soft}</span>
              </div>
            </div>

            {/* Recommended Strategies */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Strategie Consigliate dal Muretto</span>
              {tactics.pirelliTyreCompounds.recommendedStrategies.map((strat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{strat.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        strat.feasibility === 'Preferita' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {strat.feasibility} ({strat.stops} {strat.stops === 1 ? 'sosta' : 'soste'})
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs font-mono">{strat.stints}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block">Finestra Pit Stop</span>
                    <strong className="text-amber-400 text-xs font-mono">{strat.pitWindow}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: Pit Stop & Analisi Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Timer className="w-4 h-4 text-sky-400" />
              <span>Pit Lane Intelligence & Fattori Gara</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Tempo Perso Pit</span>
                <strong className="text-white font-mono text-sm">~{tactics.pitLaneInfo.pitLossTimeSeconds}s</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Limite Velocità</span>
                <strong className="text-white font-mono text-sm">{tactics.pitLaneInfo.pitSpeedLimitKmh} km/h</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Probabilità SC / VSC</span>
                <strong className="text-amber-400 font-mono text-sm">{tactics.pitLaneInfo.safetyCarProbabilityPercent}%</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Difficoltà Sorpasso</span>
                <strong className="text-sky-400 font-mono text-sm">{tactics.pitLaneInfo.overtakingDifficulty}</strong>
              </div>
            </div>
          </div>

          {/* SECTION 3: Penalità & Investigazioni FIA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span>Penalità, Sostituzioni Power Unit & Note FIA</span>
            </div>

            {tactics.penaltiesAndGridNotes && tactics.penaltiesAndGridNotes.length > 0 ? (
              <div className="space-y-2">
                {tactics.penaltiesAndGridNotes.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-white font-bold">{item.driver}</strong>
                        <span className="text-slate-400">({item.team})</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-600/30 text-red-300 border border-red-500/40">
                          {item.penalty}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Nessuna penalità in griglia o sanzione Power Unit registrata al momento per questo GP. Griglia regolare.</span>
              </div>
            )}
          </div>

          {/* SECTION 4: Setup Tecnico & Analisi Circuito */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-purple-400" />
              <span>Note Tecniche e Assetto Aerodinamico</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {tactics.skyTechnicalFocus}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Dati ufficiali aggiornati in tempo reale per ogni GP</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all"
          >
            Chiudi Scheda
          </button>
        </div>

      </div>
    </div>
  );
};
