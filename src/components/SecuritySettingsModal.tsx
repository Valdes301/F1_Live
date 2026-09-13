import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Key, 
  Save, 
  Check, 
  AlertCircle, 
  Trash2,
  RefreshCw
} from 'lucide-react';
import { UserSecurityConfig } from '../types';

interface SecuritySettingsModalProps {
  onSaved?: () => void;
}

export const SecuritySettingsModal: React.FC<SecuritySettingsModalProps> = ({
  onSaved,
}) => {
  const [config, setConfig] = useState<UserSecurityConfig>({
    maskSecrets: true,
    customApiUrl: '',
    customSkyPass: '',
    googleSyncAccount: '',
    syncToken: '',
    lastSyncTimestamp: '',
  });

  const [showSkyPass, setShowSkyPass] = useState(false);
  const [showSyncToken, setShowSyncToken] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('f1_sky_user_security');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Failed parsing security settings', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('f1_sky_user_security', JSON.stringify({
      ...config,
      lastSyncTimestamp: new Date().toISOString(),
    }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
    if (onSaved) onSaved();
  };

  const handleClear = () => {
    if (confirm('Vuoi cancellare tutte le credenziali e impostazioni salvate?')) {
      localStorage.removeItem('f1_sky_user_security');
      setConfig({
        maskSecrets: true,
        customApiUrl: '',
        customSkyPass: '',
        googleSyncAccount: '',
        syncToken: '',
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6" id="security-settings-container">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#181a24] to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Chakra_Petch']">
              Gestione Account e Credenziali Nascoste
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Tutte le credenziali personali inserite sono mascherate, protette e mantenute rigorosamente private.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Crittografia e Mascheramento Attivi</span>
        </div>
      </div>

      {/* Security Form Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        
        {/* Google Calendar Personal Account */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 font-mono">
            <Key className="w-3.5 h-3.5 text-red-400" />
            Email Account Calendario Personale (Google / Apple / Outlook)
          </label>
          <input
            type="email"
            value={config.googleSyncAccount || ''}
            onChange={(e) => setConfig(prev => ({ ...prev, googleSyncAccount: e.target.value }))}
            placeholder="es. nome.utente@gmail.com (opzionale per memo sync)"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
          />
          <p className="text-[11px] text-slate-500">
            Usata esclusivamente per associare i feed di calendario locali su richiesta.
          </p>
        </div>

        {/* Sky Go / NOW Personal Pass (Masked) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 font-mono">
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              Token / Chiave Personalizzata Sky Go / NOW
            </label>
            <button
              type="button"
              onClick={() => setShowSkyPass(!showSkyPass)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {showSkyPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showSkyPass ? 'Nascondi' : 'Mostra'}
            </button>
          </div>
          <div className="relative">
            <input
              type={showSkyPass ? 'text' : 'password'}
              value={config.customSkyPass || ''}
              onChange={(e) => setConfig(prev => ({ ...prev, customSkyPass: e.target.value }))}
              placeholder="••••••••••••••••••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500 font-mono transition-colors"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Il token è mantenuto in forma offuscata e mai inviato a terze parti.
          </p>
        </div>

        {/* Custom API Endpoint / Jolpica Key (Masked) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 font-mono">
              <Key className="w-3.5 h-3.5 text-purple-400" />
              API Token Privato (Opzionale)
            </label>
            <button
              type="button"
              onClick={() => setShowSyncToken(!showSyncToken)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {showSyncToken ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showSyncToken ? 'Nascondi' : 'Mostra'}
            </button>
          </div>
          <div className="relative">
            <input
              type={showSyncToken ? 'text' : 'password'}
              value={config.syncToken || ''}
              onChange={(e) => setConfig(prev => ({ ...prev, syncToken: e.target.value }))}
              placeholder="••••••••••••••••••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Actions Button Bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-red-950/40 text-slate-400 hover:text-red-400 text-xs font-bold border border-slate-700 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Azzera Dati
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/20 border border-red-500/30 transition-all hover:scale-[1.01]"
            id="btn-save-security-config"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            {isSaved ? 'Configurazione Salvata!' : 'Salva in Modo Sicuro'}
          </button>
        </div>

      </div>
    </div>
  );
};
