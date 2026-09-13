import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Trophy, 
  Radio, 
  Bell, 
  Download, 
  Flag,
  Tv,
  CheckCircle2,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  Flame,
  Timer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GrandPrix, DriverStanding, ConstructorStanding, NotificationSettings, CalendarExportConfig } from './types';
import { Header } from './components/Header';
import { NextSessionHero } from './components/NextSessionHero';
import { GrandPrixCard } from './components/GrandPrixCard';
import { StandingsWidget } from './components/StandingsWidget';
import { CalendarExportModal } from './components/CalendarExportModal';
import { PushNotificationManager } from './components/PushNotificationManager';
import { SkyEditorialModal } from './components/SkyEditorialModal';
import { DockerGuideModal } from './components/DockerGuideModal';
import { SecuritySettingsModal } from './components/SecuritySettingsModal';
import { StartingGridModal } from './components/StartingGridModal';
import { QualifyingResultsModal } from './components/QualifyingResultsModal';
import { f1Audio } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'standings' | 'docker' | 'security'>('calendar');
  
  // Data States
  const [races, setRaces] = useState<GrandPrix[]>([]);
  const [drivers, setDrivers] = useState<DriverStanding[]>([]);
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshingStandings, setIsRefreshingStandings] = useState(false);

  // Active Selected Grand Prix (Defaults to Spain 'spain' as requested)
  const [selectedGpId, setSelectedGpId] = useState<string>('spain');

  // Modals & Tools States
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [selectedSkyNewsGp, setSelectedSkyNewsGp] = useState<GrandPrix | null>(null);
  const [selectedGridGp, setSelectedGridGp] = useState<GrandPrix | null>(null);
  const [selectedQualiGp, setSelectedQualiGp] = useState<GrandPrix | null>(null);

  // Settings & Filters
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'sprint' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Notification Config
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    enabled: true,
    remind30Min: true,
    remind15Min: true,
    remindStart: true,
    soundAlerts: true,
    sessionTypes: ['qualifying', 'race', 'sprint']
  });

  // Calendar Export Config
  const [calendarConfig, setCalendarConfig] = useState<CalendarExportConfig>({
    includePractice: true,
    includeQualifying: true,
    includeSprint: true,
    includeRace: true,
    alert30Min: true,
    alert15Min: true,
    includeSkyTvNotes: true
  });

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [racesRes, standingsRes] = await Promise.all([
          fetch('/api/f1/calendar').then(r => r.ok ? r : fetch('/api/f1/races')),
          fetch('/api/f1/standings')
        ]);

        if (racesRes && racesRes.ok) {
          const contentType = racesRes.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await racesRes.json();
            if (Array.isArray(data)) {
              setRaces(data);
            } else if (data && Array.isArray(data.races)) {
              setRaces(data.races);
            }
          }
        }

        if (standingsRes && standingsRes.ok) {
          const contentType = standingsRes.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const standingsData = await standingsRes.json();
            setDrivers(standingsData.drivers || []);
            setConstructors(standingsData.constructors || []);
          }
        }
      } catch (err) {
        console.error('Error loading F1 data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Request Notification Permissions if enabled
  useEffect(() => {
    if (notificationSettings.enabled && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, [notificationSettings.enabled]);

  // Audio theme playback helper
  const handlePlayAnthem = () => {
    if (soundEnabled) {
      f1Audio.playLightsOutChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  // Live standings refresh
  const handleRefreshStandings = async () => {
    try {
      setIsRefreshingStandings(true);
      const res = await fetch('/api/f1/standings');
      if (res.ok) {
        const data = await res.json();
        setDrivers(data.drivers || []);
        setConstructors(data.constructors || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsRefreshingStandings(false), 600);
    }
  };

  // Filtered Grand Prix List
  const filteredRaces = useMemo(() => {
    return races.filter((gp) => {
      // Query filter
      const matchesQuery = 
        gp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gp.circuitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gp.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gp.city.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesQuery) return false;

      // Category filter
      if (filterType === 'upcoming') return gp.status === 'upcoming';
      if (filterType === 'completed') return gp.status === 'completed';
      if (filterType === 'sprint') return gp.isSprintWeekend;

      return true;
    });
  }, [races, searchQuery, filterType]);

  // Current selected race for the Hero section
  const currentFeaturedRace = useMemo(() => {
    return races.find(r => r.id === selectedGpId) || 
           races.find(r => r.status === 'live') || 
           races.find(r => r.status === 'upcoming') || 
           races[0];
  }, [races, selectedGpId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-600 selection:text-white font-sans antialiased">
      
      {/* Top Navbar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSyncModal={() => setSyncModalOpen(true)}
        openNotificationModal={() => setNotificationModalOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* TAB 1: CALENDAR & RACES */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            
            {/* Hero Banner for Selected/Live GP (Gran Premio di Spagna default) */}
            {currentFeaturedRace && (
              <NextSessionHero
                grandPrix={currentFeaturedRace}
                allGrandPrixList={races}
                onSelectGrandPrix={(gpId) => setSelectedGpId(gpId)}
                onOpenSkyNews={(gp) => setSelectedSkyNewsGp(gp)}
                onOpenSyncModal={() => setSyncModalOpen(true)}
                onOpenNotificationModal={() => setNotificationModalOpen(true)}
                onOpenGridModal={(gp) => setSelectedGridGp(gp)}
                onOpenQualifyingModal={(gp) => setSelectedQualiGp(gp)}
              />
            )}

            {/* Calendar Controls & Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-sm">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cerca Gran Premio, circuito (es. Spagna, Monza, Silverstone)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[38px] ${
                    filterType === 'all'
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Tutte (24 GP)
                </button>

                <button
                  onClick={() => setFilterType('upcoming')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[38px] ${
                    filterType === 'upcoming'
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Prossime Gare
                </button>

                <button
                  onClick={() => setFilterType('sprint')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[38px] ${
                    filterType === 'sprint'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  ⚡ Sprint
                </button>

                <button
                  onClick={() => setFilterType('completed')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[38px] ${
                    filterType === 'completed'
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Concluse
                </button>
              </div>

            </div>

            {/* Grand Prix Cards List */}
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
                <p className="text-xs text-slate-400 font-semibold font-mono">
                  Sincronizzazione orari sessioni F1 e Sky Sport in corso...
                </p>
              </div>
            ) : filteredRaces.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {filteredRaces.map((gp) => (
                  <GrandPrixCard
                    key={gp.id}
                    grandPrix={gp}
                    onOpenSkyNews={(race) => setSelectedSkyNewsGp(race)}
                    onOpenGridModal={(race) => setSelectedGridGp(race)}
                    onOpenQualifyingModal={(race) => setSelectedQualiGp(race)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 sm:p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-sm font-bold text-slate-300">Nessun Gran Premio trovato con i filtri attuali.</p>
                <button
                  onClick={() => { setSearchQuery(''); setFilterType('all'); }}
                  className="text-xs text-red-400 hover:underline font-semibold"
                >
                  Azzera filtri di ricerca
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: STANDINGS (CLASSIFICHE LIVE) */}
        {activeTab === 'standings' && (
          <div className="animate-fadeIn">
            <StandingsWidget
              drivers={drivers}
              constructors={constructors}
              onRefresh={handleRefreshStandings}
              isRefreshing={isRefreshingStandings}
            />
          </div>
        )}

        {/* TAB 3: DOCKER FOR RASPBERRY PI 4 */}
        {activeTab === 'docker' && (
          <div className="animate-fadeIn">
            <DockerGuideModal />
          </div>
        )}

        {/* TAB 4: SECURITY & HIDDEN ACCOUNT SETTINGS */}
        {activeTab === 'security' && (
          <div className="animate-fadeIn">
            <SecuritySettingsModal />
          </div>
        )}

      </main>

      {/* Modals & Popups */}
      <CalendarExportModal
        isOpen={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
        config={calendarConfig}
        setConfig={setCalendarConfig}
        races={races}
      />

      <PushNotificationManager
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        settings={notificationSettings}
        setSettings={setNotificationSettings}
        races={races}
      />

      <SkyEditorialModal
        grandPrix={selectedSkyNewsGp}
        onClose={() => setSelectedSkyNewsGp(null)}
        allRaces={races}
        onSelectGp={(id) => {
          const found = races.find(r => r.id === id);
          if (found) setSelectedSkyNewsGp(found);
          setSelectedGpId(id);
        }}
      />

      {/* Popup Scheda Griglia di Partenza */}
      <StartingGridModal
        grandPrix={selectedGridGp}
        isOpen={!!selectedGridGp}
        onClose={() => setSelectedGridGp(null)}
        onSwitchToQualifying={() => {
          const current = selectedGridGp;
          setSelectedGridGp(null);
          setSelectedQualiGp(current);
        }}
      />

      {/* Popup Scheda Risultati Qualifiche (Q1 - Q2 - Q3) */}
      <QualifyingResultsModal
        grandPrix={selectedQualiGp}
        isOpen={!!selectedQualiGp}
        onClose={() => setSelectedQualiGp(null)}
        onSwitchToGrid={() => {
          const current = selectedQualiGp;
          setSelectedQualiGp(null);
          setSelectedGridGp(current);
        }}
      />

      {/* Responsive Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-5 sm:py-6 mt-8 sm:mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>F1 Sky Sport Live Calendar • Sincronizzazione 30m e 15m prima</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-slate-400">
            <span>Sky Sport F1 (Ch. 207)</span>
            <span>•</span>
            <span>TV8 Digitale Terrestre</span>
            <span>•</span>
            <span>Raspberry Pi 4 / Docker Ready</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
