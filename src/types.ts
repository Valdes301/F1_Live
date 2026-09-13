export type SessionType = 
  | 'fp1' 
  | 'fp2' 
  | 'fp3' 
  | 'sprint_qualifying' 
  | 'sprint' 
  | 'qualifying' 
  | 'race';

export interface Session {
  id: string;
  type: SessionType;
  name: string;
  shortName: string;
  startTime: string; // ISO 8601 UTC
  endTime: string;   // ISO 8601 UTC
  skyChannel: string;
  skyLive: boolean;
  tv8Broadcast: string;
  tv8Live: boolean;
}

export interface StartingGridEntry {
  position: number;
  driverNumber: string;
  driverCode: string;
  driverName: string;
  team: string;
  teamColor: string;
  q1Time?: string;
  q2Time?: string;
  q3Time?: string;
  bestTime: string;
  tyreCompound?: 'Soft' | 'Medium' | 'Hard' | 'Intermediate' | 'Wet';
  penalty?: string;
  gapToPole?: string;
}

export interface StartingGrid {
  sessionType: 'race' | 'sprint';
  sessionName: string;
  isOfficial: boolean;
  polePositionTime: string;
  polePositionDriver: string;
  trackTempC?: number;
  airTempC?: number;
  lastUpdated: string;
  grid: StartingGridEntry[];
}

export interface RaceTacticsInfo {
  pirelliTyreCompounds: {
    hard: string; // e.g. "C1"
    medium: string; // e.g. "C2"
    soft: string; // e.g. "C3"
    recommendedStrategies: {
      name: string;
      stints: string; // e.g. "Medium (Laps 1-22) -> Hard (Laps 23-56)"
      stops: number;
      pitWindow: string; // e.g. "Giri 18-24"
      feasibility: 'Preferita' | 'Alternativa' | 'Aggressiva';
    }[];
  };
  pitLaneInfo: {
    pitLossTimeSeconds: number; // e.g. 21.8
    pitSpeedLimitKmh: number; // e.g. 80
    degradationLevel: 'Basso' | 'Medio' | 'Alto' | 'Molto Alto';
    overtakingDifficulty: 'Bassa' | 'Media' | 'Alta';
    safetyCarProbabilityPercent: number; // e.g. 65
  };
  penaltiesAndGridNotes?: {
    driver: string;
    team: string;
    penalty: string;
    reason: string;
  }[];
  skyTechnicalFocus?: string;
}

export interface GrandPrix {
  id: string;
  round: number;
  season: number;
  name: string;
  officialName: string;
  country: string;
  countryCode: string;
  city: string;
  circuitName: string;
  circuitId: string;
  circuitLengthKm: number;
  laps: number;
  raceDistanceKm: number;
  lapRecord: {
    time: string;
    driver: string;
    year: string;
  };
  isSprintWeekend: boolean;
  sessions: Session[];
  status: 'upcoming' | 'live' | 'completed';
  startingGrid?: StartingGrid;
  sprintStartingGrid?: StartingGrid;
  raceTactics?: RaceTacticsInfo;
  winner?: {
    driver: string;
    team: string;
    time: string;
  };
  weather?: {
    tempC: number;
    condition: string;
    rainChancePercent: number;
    icon: string;
  };
  skyNotes?: string;
}

export interface DriverStanding {
  position: number;
  driverId: string;
  code: string;
  number: string;
  fullName: string;
  nationality: string;
  team: string;
  teamColor: string;
  points: number;
  wins: number;
  podiums: number;
  pointsBehind: number;
  avatarUrl?: string;
}

export interface ConstructorStanding {
  position: number;
  constructorId: string;
  name: string;
  nationality: string;
  color: string;
  points: number;
  wins: number;
  pointsBehind: number;
  drivers: string[];
}

export interface NotificationSettings {
  enabled: boolean;
  remind30Min: boolean;
  remind15Min: boolean;
  remindStart: boolean;
  notifyFp: boolean;
  notifySprint: boolean;
  notifyQuali: boolean;
  notifyRace: boolean;
  soundEnabled: boolean;
  telegramBotToken?: string;
  telegramChatId?: string;
  customWebhookUrl?: string;
}

export interface CalendarExportConfig {
  includeFp: boolean;
  includeSprint: boolean;
  includeQuali: boolean;
  includeRace: boolean;
  remind30Min: boolean;
  remind15Min: boolean;
  includeSkyInfo: boolean;
  includeTv8Info: boolean;
}

export interface UserSecurityConfig {
  maskSecrets: boolean;
  customApiUrl?: string;
  customSkyPass?: string;
  googleSyncAccount?: string;
  syncToken?: string;
  lastSyncTimestamp?: string;
}
