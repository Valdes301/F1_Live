import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Bell, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Radio, 
  Flag, 
  Clock 
} from 'lucide-react';
import { getItalianCurrentTime } from '../utils/calendarHelpers';

interface HeaderProps {
  activeTab: 'calendar' | 'standings';
  setActiveTab: (tab: 'calendar' | 'standings') => void;
  openSyncModal: () => void;
  openNotificationModal: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openSyncModal,
  openNotificationModal,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [italianTime, setItalianTime] = useState(getItalianCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setItalianTime(getItalianCurrentTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0c1017]/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top bar with Branding, Italian Clock, and Quick Actions */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 overflow-hidden">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-initial">
            <button 
              onClick={() => setActiveTab('calendar')}
              className="flex items-center gap-2 sm:gap-2.5 text-left group min-w-0"
              id="brand-logo-btn"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-600/30 border border-red-500/40 group-hover:scale-105 transition-transform shrink-0">
                <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-black tracking-wider text-sm sm:text-lg md:text-xl text-white font-['Chakra_Petch'] whitespace-nowrap">
                    F1 <span className="text-red-500">LIVE</span> SKY
                  </span>
                  <span className="hidden xl:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 shrink-0">
                    <Radio className="w-2.5 h-2.5 animate-pulse text-red-500" />
                    SKY SPORT F1
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 font-medium truncate hidden sm:block">
                  Orari Dirette Sky, TV8 & Calendario 30/15m
                </p>
              </div>
            </button>
          </div>

          {/* Live Italian Time Clock Display */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono shrink-0">
            <div className="flex items-center gap-1.5 text-red-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Clock className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-300 text-[11px] font-sans font-medium">Ora Italia:</span>
            </div>
            <span className="text-white font-black text-sm tracking-wide">
              {italianTime.timeString}
            </span>
            <span className="text-[10px] text-slate-400 font-sans hidden lg:inline">
              CET/CEST
            </span>
          </div>

          {/* Action Tools & Modals Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto">
            {/* Audio Chime Toggle */}
            <button
              id="btn-sound-toggle"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Effetti audio F1 attivi' : 'Audio disattivato'}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all min-h-[38px] min-w-[38px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center shrink-0 ${
                soundEnabled 
                  ? 'bg-slate-800/80 border-slate-700 text-emerald-400 hover:bg-slate-700' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Notification Manager Trigger */}
            <button
              id="btn-open-notifications"
              onClick={openNotificationModal}
              className="relative p-2 sm:p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white transition-all shadow-sm min-h-[38px] min-w-[38px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center shrink-0"
              title="Configura Notifiche Push (30m e 15m prima)"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
            </button>

            {/* Sync Calendar Button */}
            <button
              id="btn-open-sync-calendar"
              onClick={openSyncModal}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 border border-red-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[38px] sm:min-h-[40px] shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="whitespace-nowrap"><span className="hidden sm:inline">Sync</span> Calendario</span>
            </button>
          </div>
        </div>

        {/* Live Italian Time for Small Mobile Screens */}
        <div className="flex sm:hidden items-center justify-between py-1 px-1 border-t border-slate-800/50 text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Ora Italiana:</span>
            <strong className="text-white font-mono">{italianTime.timeString}</strong>
          </span>
          <span className="text-[10px] text-slate-400 font-mono capitalize">
            {italianTime.dateString}
          </span>
        </div>

        {/* Navigation Tabs (Responsive for Mobile and Desktop) */}
        <nav className="flex items-center gap-1 py-1.5 sm:py-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          <button
            id="nav-tab-calendar"
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 min-h-[36px] ${
              activeTab === 'calendar'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Gran Premi & Orari Sky</span>
          </button>

          <button
            id="nav-tab-standings"
            onClick={() => setActiveTab('standings')}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 min-h-[36px] ${
              activeTab === 'standings'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Classifiche Live</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
