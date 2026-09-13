import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bell, 
  BellRing, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  ShieldCheck,
  Radio,
  Clock
} from 'lucide-react';
import { NotificationSettings, GrandPrix } from '../types';
import { f1Audio } from '../utils/audio';

interface PushNotificationManagerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  setSettings: React.Dispatch<React.SetStateAction<NotificationSettings>>;
  races: GrandPrix[];
}

export const PushNotificationManager: React.FC<PushNotificationManagerProps> = ({
  isOpen,
  onClose,
  settings,
  setSettings,
  races,
}) => {
  const [permissionState, setPermissionState] = useState<NotificationPermission>('default');
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionState(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const perm = await Notification.requestPermission();
      setPermissionState(perm);
      if (perm === 'granted') {
        setSettings(prev => ({ ...prev, enabled: true }));
        f1Audio.playLightsOutChime();
        new Notification('🏁 Notifiche F1 Sky Attivate!', {
          body: 'Riceverai un avviso 30m e 15m prima di ogni sessione su Sky Sport F1.',
          icon: '/favicon.ico',
        });
      }
    }
  };

  const handleTestNotification = () => {
    setTestSent(true);
    if (settings.soundEnabled) {
      f1Audio.playLightsOutChime();
    }

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('🏎️ F1 LIVE: Gran Premio d\'Italia - Monza', {
        body: '🚨 Tra 15 minuti inizia la Gara in diretta su Sky Sport F1 HD e TV8! Semafori pronti.',
        icon: '/favicon.ico',
      });
    }

    setTimeout(() => setTestSent(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        id="push-notifications-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          id="btn-close-notification-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <BellRing className="w-6 h-6 animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-['Chakra_Petch']">
              Notifiche Push & Promemoria Live
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Ricevi notifiche sul tuo dispositivo 30 e 15 minuti prima delle sessioni di F1.
            </p>
          </div>
        </div>

        {/* Permission Status Banner */}
        <div className={`p-4 rounded-xl border mb-6 flex items-start justify-between gap-4 ${
          permissionState === 'granted'
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
            : permissionState === 'denied'
            ? 'bg-red-950/40 border-red-500/40 text-red-300'
            : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
        }`}>
          <div className="flex items-start gap-3">
            {permissionState === 'granted' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : permissionState === 'denied' ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <Bell className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="font-bold text-sm text-white">
                {permissionState === 'granted'
                  ? 'Notifiche Push Attive nel Browser'
                  : permissionState === 'denied'
                  ? 'Permesso Notifiche Negato'
                  : 'Autorizzazione Notifiche Richiesta'}
              </h4>
              <p className="text-xs mt-0.5 text-slate-300">
                {permissionState === 'granted'
                  ? 'Questo dispositivo riceverà gli avvisi prima delle Prove Libere, Qualifiche e Gare.'
                  : permissionState === 'denied'
                  ? 'Hai bloccato le notifiche nelle impostazioni del browser. Sblocca il sito per attivarle.'
                  : 'Consenti le notifiche per non perdere nessuna partenza o qualifica.'}
              </p>
            </div>
          </div>

          {permissionState !== 'granted' && (
            <button
              onClick={requestPermission}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 shadow-md transition-colors"
              id="btn-request-notification-perm"
            >
              Abilita Ora
            </button>
          )}
        </div>

        {/* Timing Triggers */}
        <div className="space-y-4 mb-6">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 font-['Chakra_Petch']">
            <Clock className="w-4 h-4 text-red-500" />
            Tempi dei Promemoria
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-800/40">
              <input
                type="checkbox"
                checked={settings.remind30Min}
                onChange={(e) => setSettings(prev => ({ ...prev, remind30Min: e.target.checked }))}
                className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="font-bold text-white block">30 Minuti Prima</span>
                <span className="text-[11px] text-slate-400">Pre-gara e pit-walk Sky Sport</span>
              </div>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-800/40">
              <input
                type="checkbox"
                checked={settings.remind15Min}
                onChange={(e) => setSettings(prev => ({ ...prev, remind15Min: e.target.checked }))}
                className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="font-bold text-white block">15 Minuti Prima</span>
                <span className="text-[11px] text-slate-400">Giro di ricognizione e griglia</span>
              </div>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-800/40 sm:col-span-2">
              <input
                type="checkbox"
                checked={settings.remindStart}
                onChange={(e) => setSettings(prev => ({ ...prev, remindStart: e.target.checked }))}
                className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="font-bold text-white block">Semaforo Verde (Inizio Sessione)</span>
                <span className="text-[11px] text-slate-400">Avviso istantaneo allo spegnimento dei 5 semafori rossi</span>
              </div>
            </label>
          </div>
        </div>

        {/* Sessions Filter */}
        <div className="space-y-4 mb-6">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 font-['Chakra_Petch']">
            <Radio className="w-4 h-4 text-sky-400" />
            Sessioni da Notificare
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifyRace}
                onChange={(e) => setSettings(prev => ({ ...prev, notifyRace: e.target.checked }))}
                className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
              />
              <span className="font-semibold text-slate-200">Gare (Domenica)</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifyQuali}
                onChange={(e) => setSettings(prev => ({ ...prev, notifyQuali: e.target.checked }))}
                className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
              />
              <span className="font-semibold text-slate-200">Qualifiche Gara</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifySprint}
                onChange={(e) => setSettings(prev => ({ ...prev, notifySprint: e.target.checked }))}
                className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
              />
              <span className="font-semibold text-slate-200">Sprint Qualifying & Gara</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifyFp}
                onChange={(e) => setSettings(prev => ({ ...prev, notifyFp: e.target.checked }))}
                className="w-4 h-4 rounded text-red-600 accent-red-600 bg-slate-900 border-slate-700"
              />
              <span className="font-semibold text-slate-200">Prove Libere (FP1-3)</span>
            </label>
          </div>
        </div>

        {/* Audio & Test Section */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => setSettings(prev => ({ ...prev, soundEnabled: e.target.checked }))}
              className="w-4 h-4 rounded text-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700"
            />
            {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            Effetto Sonoro 5 Semafori F1
          </label>

          <button
            onClick={handleTestNotification}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700 transition-colors shadow-sm"
            id="btn-test-notification"
          >
            <Play className="w-3.5 h-3.5 text-amber-400" />
            {testSent ? 'Notifica Inviata!' : 'Invia Notifica di Test'}
          </button>
        </div>

      </div>
    </div>
  );
};
