import { GrandPrix, DriverStanding, ConstructorStanding, CalendarExportConfig } from '../src/types';

// Accurate Official Team Colors (2026 Season)
export const TEAM_COLORS: Record<string, string> = {
  'Mercedes': '#27F4D2',
  'Ferrari': '#E80020',
  'McLaren': '#FF8000',
  'Red Bull': '#3671C6',
  'Red Bull Racing': '#3671C6',
  'RB': '#6692FF',
  'RB F1 Team': '#6692FF',
  'Alpine': '#FF87BC',
  'Alpine F1 Team': '#FF87BC',
  'Haas': '#B6BABD',
  'Haas F1 Team': '#B6BABD',
  'Audi': '#52E252',
  'Kick Sauber': '#52E252',
  'Williams': '#64C4FF',
  'Aston Martin': '#229971',
  'Cadillac': '#D4AF37',
  'Cadillac F1 Team': '#D4AF37',
};

// Driver team driver-pair mapping for constructors
export const CONSTRUCTOR_DRIVERS_MAP: Record<string, string[]> = {
  'mercedes': ['Andrea Kimi Antonelli', 'George Russell'],
  'ferrari': ['Lewis Hamilton', 'Charles Leclerc'],
  'mclaren': ['Lando Norris', 'Oscar Piastri'],
  'red_bull': ['Max Verstappen', 'Isack Hadjar'],
  'rb': ['Liam Lawson', 'Arvid Lindblad', 'Yuki Tsunoda'],
  'alpine': ['Pierre Gasly', 'Franco Colapinto'],
  'haas': ['Oliver Bearman', 'Esteban Ocon'],
  'audi': ['Gabriel Bortoleto', 'Nico Hülkenberg'],
  'williams': ['Carlos Sainz', 'Alexander Albon'],
  'aston_martin': ['Fernando Alonso', 'Lance Stroll'],
  'cadillac': ['Valtteri Bottas', 'Sergio Pérez'],
};

// 2026 Official Calendar with exact dates matching today's Round 14 (Gran Premio di Spagna - 12-13 Settembre 2026)
export const OFFICIAL_F1_CALENDAR: GrandPrix[] = [
  {
    id: 'australia',
    round: 1,
    season: 2026,
    name: 'Gran Premio d\'Australia',
    officialName: 'FORMULA 1 AUSTRALIAN GRAND PRIX 2026',
    country: 'Australia',
    countryCode: 'AU',
    city: 'Melbourne',
    circuitName: 'Albert Park Circuit',
    circuitId: 'albert_park',
    circuitLengthKm: 5.278,
    laps: 58,
    raceDistanceKm: 306.124,
    lapRecord: { time: '1:19.813', driver: 'Charles Leclerc', year: '2024' },
    isSprintWeekend: false,
    status: 'completed',
    winner: { driver: 'Andrea Kimi Antonelli', team: 'Mercedes', time: '1:21:05.120' },
    weather: { tempC: 22, condition: 'Soleggiato', rainChancePercent: 10, icon: 'sun' },
    skyNotes: 'Diretta su Sky Sport F1 (ch. 207) e NOW con Carlo Vanzini e Marc Genè.',
    sessions: [
      { id: 'aus-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-03-06T01:30:00Z', endTime: '2026-03-06T02:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'aus-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-03-06T05:00:00Z', endTime: '2026-03-06T06:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'aus-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-03-07T01:30:00Z', endTime: '2026-03-07T02:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'aus-quali', type: 'qualifying', name: 'Qualifiche Ufficiali', shortName: 'QUALIFICA', startTime: '2026-03-07T05:00:00Z', endTime: '2026-03-07T06:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 14:00', tv8Live: false },
      { id: 'aus-race', type: 'race', name: 'Gara - GP d\'Australia', shortName: 'GARA', startTime: '2026-03-08T04:00:00Z', endTime: '2026-03-08T06:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & Sky Sport Uno', skyLive: true, tv8Broadcast: 'Differita ore 14:00', tv8Live: false }
    ]
  },
  {
    id: 'china',
    round: 2,
    season: 2026,
    name: 'Gran Premio di Cina',
    officialName: 'FORMULA 1 CHINESE GRAND PRIX 2026',
    country: 'Cina',
    countryCode: 'CN',
    city: 'Shanghai',
    circuitName: 'Shanghai International Circuit',
    circuitId: 'shanghai',
    circuitLengthKm: 5.451,
    laps: 56,
    raceDistanceKm: 305.066,
    lapRecord: { time: '1:32.238', driver: 'Michael Schumacher', year: '2004' },
    isSprintWeekend: true,
    status: 'completed',
    winner: { driver: 'Andrea Kimi Antonelli', team: 'Mercedes', time: '1:31:14.200' },
    weather: { tempC: 19, condition: 'Nuvoloso', rainChancePercent: 20, icon: 'cloud' },
    skyNotes: 'Weekend Sprint: Sprint Qualifying e Gara Sprint in diretta esclusiva su Sky.',
    sessions: [
      { id: 'chn-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-03-13T03:30:00Z', endTime: '2026-03-13T04:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'chn-sprint-quali', type: 'sprint_qualifying', name: 'Sprint Qualifying', shortName: 'SPRINT QUALI', startTime: '2026-03-13T07:30:00Z', endTime: '2026-03-13T08:14:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 15:30', tv8Live: false },
      { id: 'chn-sprint', type: 'sprint', name: 'Gara Sprint', shortName: 'SPRINT', startTime: '2026-03-14T03:00:00Z', endTime: '2026-03-14T04:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 12:30', tv8Live: false },
      { id: 'chn-quali', type: 'qualifying', name: 'Qualifiche Gara', shortName: 'QUALIFICA', startTime: '2026-03-14T07:00:00Z', endTime: '2026-03-14T08:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 14:30', tv8Live: false },
      { id: 'chn-race', type: 'race', name: 'Gara - GP di Cina', shortName: 'GARA', startTime: '2026-03-15T07:00:00Z', endTime: '2026-03-15T09:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 14:00', tv8Live: false }
    ]
  },
  {
    id: 'japan',
    round: 3,
    season: 2026,
    name: 'Gran Premio del Giappone',
    officialName: 'FORMULA 1 JAPANESE GRAND PRIX 2026',
    country: 'Giappone',
    countryCode: 'JP',
    city: 'Suzuka',
    circuitName: 'Suzuka International Racing Course',
    circuitId: 'suzuka',
    circuitLengthKm: 5.807,
    laps: 53,
    raceDistanceKm: 307.471,
    lapRecord: { time: '1:30.983', driver: 'Lewis Hamilton', year: '2019' },
    isSprintWeekend: false,
    status: 'completed',
    winner: { driver: 'George Russell', team: 'Mercedes', time: '1:28:50.110' },
    weather: { tempC: 18, condition: 'Variabile', rainChancePercent: 30, icon: 'cloud-rain' },
    skyNotes: 'Il tempio della tecnica tra le Esses e la mitica 130R.',
    sessions: [
      { id: 'jpn-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-03-27T02:30:00Z', endTime: '2026-03-27T03:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'jpn-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-03-27T06:00:00Z', endTime: '2026-03-27T07:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'jpn-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-03-28T02:30:00Z', endTime: '2026-03-28T03:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'jpn-quali', type: 'qualifying', name: 'Qualifiche Ufficiali', shortName: 'QUALIFICA', startTime: '2026-03-28T06:00:00Z', endTime: '2026-03-28T07:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 14:00', tv8Live: false },
      { id: 'jpn-race', type: 'race', name: 'Gara - GP del Giappone', shortName: 'GARA', startTime: '2026-03-29T05:00:00Z', endTime: '2026-03-29T07:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 14:00', tv8Live: false }
    ]
  },
  {
    id: 'miami',
    round: 4,
    season: 2026,
    name: 'Gran Premio di Miami',
    officialName: 'FORMULA 1 MIAMI GRAND PRIX 2026',
    country: 'Stati Uniti',
    countryCode: 'US',
    city: 'Miami, Florida',
    circuitName: 'Miami International Autodrome',
    circuitId: 'miami',
    circuitLengthKm: 5.412,
    laps: 57,
    raceDistanceKm: 308.326,
    lapRecord: { time: '1:29.708', driver: 'Max Verstappen', year: '2023' },
    isSprintWeekend: true,
    status: 'completed',
    winner: { driver: 'Andrea Kimi Antonelli', team: 'Mercedes', time: '1:29:40.300' },
    weather: { tempC: 28, condition: 'Soleggiato', rainChancePercent: 10, icon: 'sun' },
    skyNotes: 'Sprint Weekend attorno all\'Hard Rock Stadium.',
    sessions: [
      { id: 'mia-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-05-01T16:30:00Z', endTime: '2026-05-01T17:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'mia-sprint-quali', type: 'sprint_qualifying', name: 'Sprint Qualifying', shortName: 'SPRINT QUALI', startTime: '2026-05-01T20:30:00Z', endTime: '2026-05-01T21:14:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 23:30', tv8Live: false },
      { id: 'mia-sprint', type: 'sprint', name: 'Gara Sprint Miami', shortName: 'SPRINT', startTime: '2026-05-02T16:00:00Z', endTime: '2026-05-02T17:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false },
      { id: 'mia-quali', type: 'qualifying', name: 'Qualifiche Ufficiali', shortName: 'QUALIFICA', startTime: '2026-05-02T20:00:00Z', endTime: '2026-05-02T21:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 22:30', tv8Live: false },
      { id: 'mia-race', type: 'race', name: 'Gara - GP di Miami', shortName: 'GARA', startTime: '2026-05-03T20:00:00Z', endTime: '2026-05-03T22:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 23:00', tv8Live: false }
    ]
  },
  {
    id: 'canada',
    round: 5,
    season: 2026,
    name: 'Gran Premio del Canada',
    officialName: 'FORMULA 1 GRAND PRIX DU CANADA 2026',
    country: 'Canada',
    countryCode: 'CA',
    city: 'Montréal',
    circuitName: 'Circuit Gilles-Villeneuve',
    circuitId: 'villeneuve',
    circuitLengthKm: 4.361,
    laps: 70,
    raceDistanceKm: 305.270,
    lapRecord: { time: '1:13.078', driver: 'Valtteri Bottas', year: '2019' },
    isSprintWeekend: false,
    status: 'completed',
    winner: { driver: 'Lewis Hamilton', team: 'Ferrari', time: '1:33:12.800' },
    weather: { tempC: 21, condition: 'Variabile', rainChancePercent: 30, icon: 'cloud-rain' },
    skyNotes: 'L\'iconico Muro dei Campioni e le violente staccate.',
    sessions: [
      { id: 'can-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-05-22T17:30:00Z', endTime: '2026-05-22T18:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'can-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-05-22T21:00:00Z', endTime: '2026-05-22T22:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'can-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-05-23T16:30:00Z', endTime: '2026-05-23T17:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'can-quali', type: 'qualifying', name: 'Qualifiche Ufficiali Canada', shortName: 'QUALIFICA', startTime: '2026-05-23T20:00:00Z', endTime: '2026-05-23T21:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 23:30', tv8Live: false },
      { id: 'can-race', type: 'race', name: 'Gara - GP del Canada', shortName: 'GARA', startTime: '2026-05-24T18:00:00Z', endTime: '2026-05-24T20:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 21:30', tv8Live: false }
    ]
  },
  {
    id: 'monaco',
    round: 6,
    season: 2026,
    name: 'Gran Premio di Monaco',
    officialName: 'FORMULA 1 GRAND PRIX DE MONACO 2026',
    country: 'Monaco',
    countryCode: 'MC',
    city: 'Monte Carlo',
    circuitName: 'Circuit de Monaco',
    circuitId: 'monaco',
    circuitLengthKm: 3.337,
    laps: 78,
    raceDistanceKm: 260.286,
    lapRecord: { time: '1:12.909', driver: 'Lewis Hamilton', year: '2021' },
    isSprintWeekend: false,
    status: 'completed',
    winner: { driver: 'Charles Leclerc', team: 'Ferrari', time: '1:58:20.100' },
    weather: { tempC: 24, condition: 'Soleggiato', rainChancePercent: 10, icon: 'sun' },
    skyNotes: 'Il sabato a Monte Carlo decide l\'intero weekend.',
    sessions: [
      { id: 'mon-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-06-05T11:30:00Z', endTime: '2026-06-05T12:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'mon-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-06-05T15:00:00Z', endTime: '2026-06-05T16:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'mon-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-06-06T10:30:00Z', endTime: '2026-06-06T11:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'mon-quali', type: 'qualifying', name: 'Qualifiche Ufficiali Monaco', shortName: 'QUALIFICA', startTime: '2026-06-06T14:00:00Z', endTime: '2026-06-06T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false },
      { id: 'mon-race', type: 'race', name: 'Gara - GP di Monaco', shortName: 'GARA', startTime: '2026-06-07T13:00:00Z', endTime: '2026-06-07T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & Sky Sport Uno', skyLive: true, tv8Broadcast: 'Differita ore 18:00', tv8Live: false }
    ]
  },
  {
    id: 'barcelona-spring',
    round: 7,
    season: 2026,
    name: 'Gran Premio di Catalogna',
    officialName: 'FORMULA 1 BARCELONA GRAND PRIX 2026',
    country: 'Spagna',
    countryCode: 'ES',
    city: 'Barcellona',
    circuitName: 'Circuit de Barcelona-Catalunya',
    circuitId: 'catalunya',
    circuitLengthKm: 4.657,
    laps: 66,
    raceDistanceKm: 307.236,
    lapRecord: { time: '1:16.330', driver: 'Max Verstappen', year: '2023' },
    isSprintWeekend: false,
    status: 'completed',
    winner: { driver: 'Andrea Kimi Antonelli', team: 'Mercedes', time: '1:27:30.900' },
    weather: { tempC: 26, condition: 'Soleggiato', rainChancePercent: 5, icon: 'sun' },
    skyNotes: 'Diretta su Sky Sport F1 HD con telemetrie live.',
    sessions: [
      { id: 'bcn-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-06-12T11:30:00Z', endTime: '2026-06-12T12:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'bcn-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-06-12T15:00:00Z', endTime: '2026-06-12T16:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'bcn-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-06-13T10:30:00Z', endTime: '2026-06-13T11:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'bcn-quali', type: 'qualifying', name: 'Qualifiche Ufficiali', shortName: 'QUALIFICA', startTime: '2026-06-13T14:00:00Z', endTime: '2026-06-13T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false },
      { id: 'bcn-race', type: 'race', name: 'Gara - GP di Catalogna', shortName: 'GARA', startTime: '2026-06-14T13:00:00Z', endTime: '2026-06-14T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:00', tv8Live: false }
    ]
  },
  {
    id: 'austria',
    round: 8,
    season: 2026,
    name: 'Gran Premio d\'Austria',
    officialName: 'FORMULA 1 AUSTRIAN GRAND PRIX 2026',
    country: 'Austria',
    countryCode: 'AT',
    city: 'Spielberg',
    circuitName: 'Red Bull Ring',
    circuitId: 'red_bull_ring',
    circuitLengthKm: 4.318,
    laps: 71,
    raceDistanceKm: 306.452,
    lapRecord: { time: '1:05.619', driver: 'Carlos Sainz', year: '2020' },
    isSprintWeekend: true,
    status: 'completed',
    winner: { driver: 'George Russell', team: 'Mercedes', time: '1:24:18.000' },
    weather: { tempC: 25, condition: 'Soleggiato', rainChancePercent: 15, icon: 'sun' },
    skyNotes: 'Weekend Sprint tra i boschi della Stiria.',
    sprintStartingGrid: {
      sessionType: 'sprint',
      sessionName: 'Griglia di Partenza Sprint - Red Bull Ring (Austria)',
      isOfficial: true,
      polePositionDriver: 'Max Verstappen',
      polePositionTime: '1:04.980',
      trackTempC: 32,
      airTempC: 25,
      lastUpdated: '2026-06-26T15:30:00Z',
      grid: [
        { position: 1, driverNumber: '1', driverCode: 'VER', driverName: 'Max Verstappen', team: 'Red Bull Racing', teamColor: '#3671C6', bestTime: '1:04.980', tyreCompound: 'Medium', gapToPole: 'POLE' },
        { position: 2, driverNumber: '4', driverCode: 'NOR', driverName: 'Lando Norris', team: 'McLaren', teamColor: '#FF8000', bestTime: '1:05.073', tyreCompound: 'Medium', gapToPole: '+0.093s' },
        { position: 3, driverNumber: '63', driverCode: 'RUS', driverName: 'George Russell', team: 'Mercedes', teamColor: '#27F4D2', bestTime: '1:05.150', tyreCompound: 'Medium', gapToPole: '+0.170s' },
        { position: 4, driverNumber: '12', driverCode: 'ANT', driverName: 'Andrea Kimi Antonelli', team: 'Mercedes', teamColor: '#27F4D2', bestTime: '1:05.210', tyreCompound: 'Medium', gapToPole: '+0.230s' },
        { position: 5, driverNumber: '16', driverCode: 'LEC', driverName: 'Charles Leclerc', team: 'Ferrari', teamColor: '#E80020', bestTime: '1:05.290', tyreCompound: 'Medium', gapToPole: '+0.310s' },
        { position: 6, driverNumber: '44', driverCode: 'HAM', driverName: 'Lewis Hamilton', team: 'Ferrari', teamColor: '#E80020', bestTime: '1:05.340', tyreCompound: 'Medium', gapToPole: '+0.360s' },
        { position: 7, driverNumber: '81', driverCode: 'PIA', driverName: 'Oscar Piastri', team: 'McLaren', teamColor: '#FF8000', bestTime: '1:05.410', tyreCompound: 'Medium', gapToPole: '+0.430s' },
        { position: 8, driverNumber: '55', driverCode: 'SAI', driverName: 'Carlos Sainz', team: 'Williams', teamColor: '#64C4FF', bestTime: '1:05.520', tyreCompound: 'Medium', gapToPole: '+0.540s' },
      ]
    },
    startingGrid: {
      sessionType: 'race',
      sessionName: 'Griglia di Partenza Gara Ufficiale - Red Bull Ring (Austria)',
      isOfficial: true,
      polePositionDriver: 'George Russell',
      polePositionTime: '1:04.314',
      trackTempC: 36,
      airTempC: 26,
      lastUpdated: '2026-06-27T15:30:00Z',
      grid: [
        { position: 1, driverNumber: '63', driverCode: 'RUS', driverName: 'George Russell', team: 'Mercedes', teamColor: '#27F4D2', bestTime: '1:04.314', tyreCompound: 'Soft', gapToPole: 'POLE' },
        { position: 2, driverNumber: '1', driverCode: 'VER', driverName: 'Max Verstappen', team: 'Red Bull Racing', teamColor: '#3671C6', bestTime: '1:04.340', tyreCompound: 'Medium', gapToPole: '+0.026s' },
        { position: 3, driverNumber: '4', driverCode: 'NOR', driverName: 'Lando Norris', team: 'McLaren', teamColor: '#FF8000', bestTime: '1:04.380', tyreCompound: 'Medium', gapToPole: '+0.066s' },
        { position: 4, driverNumber: '12', driverCode: 'ANT', driverName: 'Andrea Kimi Antonelli', team: 'Mercedes', teamColor: '#27F4D2', bestTime: '1:04.420', tyreCompound: 'Soft', gapToPole: '+0.106s' },
        { position: 5, driverNumber: '16', driverCode: 'LEC', driverName: 'Charles Leclerc', team: 'Ferrari', teamColor: '#E80020', bestTime: '1:04.500', tyreCompound: 'Medium', gapToPole: '+0.186s' },
        { position: 6, driverNumber: '44', driverCode: 'HAM', driverName: 'Lewis Hamilton', team: 'Ferrari', teamColor: '#E80020', bestTime: '1:04.550', tyreCompound: 'Soft', gapToPole: '+0.236s' },
      ]
    },
    sessions: [
      { id: 'aut-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-06-26T10:30:00Z', endTime: '2026-06-26T11:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'aut-sprint-quali', type: 'sprint_qualifying', name: 'Sprint Qualifying', shortName: 'SPRINT QUALI', startTime: '2026-06-26T14:30:00Z', endTime: '2026-06-26T15:14:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false },
      { id: 'aut-sprint', type: 'sprint', name: 'Gara Sprint Austria', shortName: 'SPRINT', startTime: '2026-06-27T10:00:00Z', endTime: '2026-06-27T11:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 14:00', tv8Live: false },
      { id: 'aut-quali', type: 'qualifying', name: 'Qualifiche Ufficiali', shortName: 'QUALIFICA', startTime: '2026-06-27T14:00:00Z', endTime: '2026-06-27T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:00', tv8Live: false },
      { id: 'aut-race', type: 'race', name: 'Gara - GP d\'Austria', shortName: 'GARA', startTime: '2026-06-28T13:00:00Z', endTime: '2026-06-28T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:00', tv8Live: false }
    ]
  },
  {
    id: 'silverstone',
    round: 9,
    season: 2026,
    name: 'Gran Premio di Gran Bretagna',
    officialName: 'FORMULA 1 BRITISH GRAND PRIX 2026',
    country: 'Regno Unito',
    countryCode: 'GB',
    city: 'Silverstone',
    circuitName: 'Silverstone Circuit',
    circuitId: 'silverstone',
    circuitLengthKm: 5.891,
    laps: 52,
    raceDistanceKm: 306.198,
    lapRecord: { time: '1:27.097', driver: 'Max Verstappen', year: '2020' },
    isSprintWeekend: false,
    status: 'completed',
    winner: { driver: 'Lando Norris', team: 'McLaren', time: '1:27:55.200' },
    weather: { tempC: 20, condition: 'Variabile', rainChancePercent: 40, icon: 'cloud-rain' },
    skyNotes: 'Copse, Maggotts e Becketts.',
    sessions: [
      { id: 'gbr-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-07-03T11:30:00Z', endTime: '2026-07-03T12:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'gbr-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-07-03T15:00:00Z', endTime: '2026-07-03T16:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'gbr-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-07-04T10:30:00Z', endTime: '2026-07-04T11:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'gbr-quali', type: 'qualifying', name: 'Qualifiche Ufficiali Silverstone', shortName: 'QUALIFICA', startTime: '2026-07-04T14:00:00Z', endTime: '2026-07-04T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false },
      { id: 'gbr-race', type: 'race', name: 'Gara - GP di Gran Bretagna', shortName: 'GARA', startTime: '2026-07-05T14:00:00Z', endTime: '2026-07-05T16:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false }
    ]
  },
  {
    id: 'belgium',
    round: 10,
    season: 2026,
    name: 'Gran Premio del Belgio (Spa)',
    officialName: 'FORMULA 1 BELGIAN GRAND PRIX 2026',
    country: 'Belgio',
    countryCode: 'BE',
    city: 'Spa-Francorchamps',
    circuitName: 'Circuit de Spa-Francorchamps',
    circuitId: 'spa',
    circuitLengthKm: 7.004,
    laps: 44,
    raceDistanceKm: 308.052,
    lapRecord: { time: '1:46.286', driver: 'Valtteri Bottas', year: '2018' },
    isSprintWeekend: true,
    status: 'completed',
    winner: { driver: 'Andrea Kimi Antonelli', team: 'Mercedes', time: '1:20:44.200' },
    weather: { tempC: 19, condition: 'Pioggia a tratti', rainChancePercent: 60, icon: 'cloud-rain' },
    skyNotes: 'Eau Rouge-Raidillon sotto la pioggia.',
    sessions: [
      { id: 'bel-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-07-17T11:30:00Z', endTime: '2026-07-17T12:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'bel-sprint-quali', type: 'sprint_qualifying', name: 'Sprint Qualifying Spa', shortName: 'SPRINT QUALI', startTime: '2026-07-17T14:30:00Z', endTime: '2026-07-17T15:14:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false },
      { id: 'bel-sprint', type: 'sprint', name: 'Gara Sprint Spa', shortName: 'SPRINT', startTime: '2026-07-18T10:00:00Z', endTime: '2026-07-18T11:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 14:00', tv8Live: false },
      { id: 'bel-quali', type: 'qualifying', name: 'Qualifiche Ufficiali', shortName: 'QUALIFICA', startTime: '2026-07-18T14:00:00Z', endTime: '2026-07-18T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:00', tv8Live: false },
      { id: 'bel-race', type: 'race', name: 'Gara - GP del Belgio', shortName: 'GARA', startTime: '2026-07-19T13:00:00Z', endTime: '2026-07-19T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:00', tv8Live: false }
    ]
  },
  {
    id: 'hungary',
    round: 11,
    season: 2026,
    name: 'Gran Premio d\'Ungheria',
    officialName: 'FORMULA 1 HUNGARIAN GRAND PRIX 2026',
    country: 'Ungheria',
    countryCode: 'HU',
    city: 'Budapest',
    circuitName: 'Hungaroring',
    circuitId: 'hungaroring',
    circuitLengthKm: 4.381,
    laps: 70,
    raceDistanceKm: 306.630,
    lapRecord: { time: '1:16.627', driver: 'Lewis Hamilton', year: '2020' },
    isSprintWeekend: false,
    status: 'completed',
    winner: { driver: 'Lando Norris', team: 'McLaren', time: '1:36:50.000' },
    weather: { tempC: 31, condition: 'Caldo torrido', rainChancePercent: 10, icon: 'sun' },
    skyNotes: 'Il kartodromo della F1.',
    sessions: [
      { id: 'hun-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-07-24T11:30:00Z', endTime: '2026-07-24T12:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'hun-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-07-24T15:00:00Z', endTime: '2026-07-24T16:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'hun-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-07-25T10:30:00Z', endTime: '2026-07-25T11:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'hun-quali', type: 'qualifying', name: 'Qualifiche Ufficiali', shortName: 'QUALIFICA', startTime: '2026-07-25T14:00:00Z', endTime: '2026-07-25T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false },
      { id: 'hun-race', type: 'race', name: 'Gara - GP d\'Ungheria', shortName: 'GARA', startTime: '2026-07-26T13:00:00Z', endTime: '2026-07-26T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:00', tv8Live: false }
    ]
  },
  {
    id: 'netherlands',
    round: 12,
    season: 2026,
    name: 'Gran Premio d\'Olanda',
    officialName: 'FORMULA 1 DUTCH GRAND PRIX 2026',
    country: 'Paesi Bassi',
    countryCode: 'NL',
    city: 'Zandvoort',
    circuitName: 'Circuit Zandvoort',
    circuitId: 'zandvoort',
    circuitLengthKm: 4.259,
    laps: 72,
    raceDistanceKm: 306.587,
    lapRecord: { time: '1:11.097', driver: 'Lewis Hamilton', year: '2021' },
    isSprintWeekend: false,
    status: 'completed',
    winner: { driver: 'Andrea Kimi Antonelli', team: 'Mercedes', time: '1:30:10.400' },
    weather: { tempC: 22, condition: 'Vento forte', rainChancePercent: 20, icon: 'cloud' },
    skyNotes: 'Curve sopraelevate con banking a 19 gradi.',
    sessions: [
      { id: 'nld-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-08-21T10:30:00Z', endTime: '2026-08-21T11:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'nld-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-08-21T14:00:00Z', endTime: '2026-08-21T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'nld-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-08-22T09:30:00Z', endTime: '2026-08-22T10:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'nld-quali', type: 'qualifying', name: 'Qualifiche Ufficiali', shortName: 'QUALIFICA', startTime: '2026-08-22T13:00:00Z', endTime: '2026-08-22T14:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false },
      { id: 'nld-race', type: 'race', name: 'Gara - GP d\'Olanda', shortName: 'GARA', startTime: '2026-08-23T13:00:00Z', endTime: '2026-08-23T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:00', tv8Live: false }
    ]
  },
  {
    id: 'monza',
    round: 13,
    season: 2026,
    name: 'Gran Premio d\'Italia (Monza)',
    officialName: 'FORMULA 1 GRAN PREMIO D\'ITALIA 2026',
    country: 'Italia',
    countryCode: 'IT',
    city: 'Monza',
    circuitName: 'Autodromo Nazionale Monza',
    circuitId: 'monza',
    circuitLengthKm: 5.793,
    laps: 53,
    raceDistanceKm: 306.720,
    lapRecord: { time: '1:21.046', driver: 'Rubens Barrichello', year: '2004' },
    isSprintWeekend: false,
    status: 'completed',
    winner: { driver: 'Andrea Kimi Antonelli', team: 'Mercedes', time: '1:14:12.300' },
    weather: { tempC: 28, condition: 'Soleggiato estivo', rainChancePercent: 5, icon: 'sun' },
    skyNotes: 'DIRETTA IN CHIARO ANCHE SU TV8! Trionfo a Monza.',
    sessions: [
      { id: 'monza-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-09-04T11:30:00Z', endTime: '2026-09-04T12:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Diretta TV8 ore 13:30 CEST', tv8Live: true },
      { id: 'monza-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-09-04T15:00:00Z', endTime: '2026-09-04T16:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Diretta TV8 ore 17:00 CEST', tv8Live: true },
      { id: 'monza-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-09-05T10:30:00Z', endTime: '2026-09-05T11:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Diretta TV8 ore 12:30 CEST', tv8Live: true },
      { id: 'monza-quali', type: 'qualifying', name: 'Qualifiche Ufficiali Monza', shortName: 'QUALIFICA', startTime: '2026-09-05T14:00:00Z', endTime: '2026-09-05T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & TV8', skyLive: true, tv8Broadcast: 'DIRETTA IN CHIARO TV8 ore 16:00 CEST', tv8Live: true },
      { id: 'monza-race', type: 'race', name: 'Gara - GP d\'Italia a Monza', shortName: 'GARA', startTime: '2026-09-06T13:00:00Z', endTime: '2026-09-06T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & TV8', skyLive: true, tv8Broadcast: 'DIRETTA IN CHIARO TV8 ore 15:00 CEST', tv8Live: true }
    ]
  },
  {
    id: 'spain',
    round: 14,
    season: 2026,
    name: 'Gran Premio di Spagna (Madrid / Jarama)',
    officialName: 'FORMULA 1 SPANISH GRAND PRIX 2026',
    country: 'Spagna',
    countryCode: 'ES',
    city: 'Madrid',
    circuitName: 'Circuito di Madrid / Madring',
    circuitId: 'madring',
    circuitLengthKm: 5.474,
    laps: 56,
    raceDistanceKm: 306.544,
    lapRecord: { time: '1:31.824', driver: 'Lando Norris', year: '2026' },
    isSprintWeekend: false,
    status: 'live',
    weather: { tempC: 28, condition: 'Soleggiato e asciutto', rainChancePercent: 0, icon: 'sun' },
    skyNotes: 'DIRETTA ESCLUSIVA SKY SPORT F1 HD: Gara live ore 15:00 CEST. Sintonizzati su Sky Sport F1 (Ch. 207) e NOW.',
    startingGrid: {
      sessionType: 'race',
      sessionName: 'Griglia di Partenza Ufficiale FIA - Gran Premio di Spagna (Madrid)',
      isOfficial: true,
      polePositionDriver: 'Lando Norris',
      polePositionTime: '1:31.824',
      trackTempC: 41,
      airTempC: 28,
      lastUpdated: '2026-09-12T15:45:00Z',
      grid: [
        { position: 1, driverNumber: '4', driverCode: 'NOR', driverName: 'Lando Norris', team: 'McLaren', teamColor: '#FF8000', q1Time: '1:32.410', q2Time: '1:32.015', q3Time: '1:31.824', bestTime: '1:31.824', tyreCompound: 'Medium', gapToPole: 'POLE' },
        { position: 2, driverNumber: '12', driverCode: 'ANT', driverName: 'Andrea Kimi Antonelli', team: 'Mercedes', teamColor: '#27F4D2', q1Time: '1:32.380', q2Time: '1:31.980', q3Time: '1:31.835', bestTime: '1:31.835', tyreCompound: 'Medium', gapToPole: '+0.011s' },
        { position: 3, driverNumber: '1', driverCode: 'VER', driverName: 'Max Verstappen', team: 'Red Bull Racing', teamColor: '#3671C6', q1Time: '1:32.550', q2Time: '1:32.100', q3Time: '1:31.964', bestTime: '1:31.964', tyreCompound: 'Soft', gapToPole: '+0.140s' },
        { position: 4, driverNumber: '44', driverCode: 'HAM', driverName: 'Lewis Hamilton', team: 'Ferrari', teamColor: '#E80020', q1Time: '1:32.620', q2Time: '1:32.190', q3Time: '1:32.013', bestTime: '1:32.013', tyreCompound: 'Medium', gapToPole: '+0.189s' },
        { position: 5, driverNumber: '16', driverCode: 'LEC', driverName: 'Charles Leclerc', team: 'Ferrari', teamColor: '#E80020', q1Time: '1:32.490', q2Time: '1:32.120', q3Time: '1:32.019', bestTime: '1:32.019', tyreCompound: 'Medium', gapToPole: '+0.195s' },
        { position: 6, driverNumber: '63', driverCode: 'RUS', driverName: 'George Russell', team: 'Mercedes', teamColor: '#27F4D2', q1Time: '1:32.580', q2Time: '1:32.250', q3Time: '1:32.149', bestTime: '1:32.149', tyreCompound: 'Soft', gapToPole: '+0.325s' },
        { position: 7, driverNumber: '81', driverCode: 'PIA', driverName: 'Oscar Piastri', team: 'McLaren', teamColor: '#FF8000', q1Time: '1:32.710', q2Time: '1:32.310', q3Time: '1:32.294', bestTime: '1:32.294', tyreCompound: 'Soft', gapToPole: '+0.470s' },
        { position: 8, driverNumber: '30', driverCode: 'LAW', driverName: 'Liam Lawson', team: 'Red Bull Racing', teamColor: '#3671C6', q1Time: '1:32.850', q2Time: '1:32.420', q3Time: '1:32.316', bestTime: '1:32.316', tyreCompound: 'Medium', gapToPole: '+0.492s' },
        { position: 9, driverNumber: '43', driverCode: 'COL', driverName: 'Franco Colapinto', team: 'Alpine', teamColor: '#FF87BC', q1Time: '1:32.920', q2Time: '1:32.550', q3Time: '1:32.903', bestTime: '1:32.903', tyreCompound: 'Soft', gapToPole: '+1.079s' },
        { position: 10, driverNumber: '40', driverCode: 'LIN', driverName: 'Arvid Lindblad', team: 'Racing Bulls', teamColor: '#6692FF', q1Time: '1:32.980', q2Time: '1:32.610', q3Time: '1:33.041', bestTime: '1:33.041', tyreCompound: 'Soft', gapToPole: '+1.217s' },
        { position: 11, driverNumber: '23', driverCode: 'ALB', driverName: 'Alexander Albon', team: 'Williams', teamColor: '#64C4FF', q1Time: '1:32.990', q2Time: '1:32.680', bestTime: '1:32.680', tyreCompound: 'Medium', gapToPole: '+0.856s' },
        { position: 12, driverNumber: '10', driverCode: 'GAS', driverName: 'Pierre Gasly', team: 'Alpine', teamColor: '#FF87BC', q1Time: '1:33.050', q2Time: '1:32.740', bestTime: '1:32.740', tyreCompound: 'Medium', gapToPole: '+0.916s' },
        { position: 13, driverNumber: '5', driverCode: 'BOR', driverName: 'Gabriel Bortoleto', team: 'Audi', teamColor: '#52E252', q1Time: '1:33.110', q2Time: '1:32.810', bestTime: '1:32.810', tyreCompound: 'Soft', gapToPole: '+0.986s' },
        { position: 14, driverNumber: '31', driverCode: 'OCO', driverName: 'Esteban Ocon', team: 'Haas F1 Team', teamColor: '#B6BABD', q1Time: '1:33.180', q2Time: '1:32.890', bestTime: '1:32.890', tyreCompound: 'Medium', gapToPole: '+1.066s' },
        { position: 15, driverNumber: '14', driverCode: 'ALO', driverName: 'Fernando Alonso', team: 'Aston Martin', teamColor: '#229971', q1Time: '1:33.220', q2Time: '1:32.950', bestTime: '1:32.950', tyreCompound: 'Medium', gapToPole: '+1.126s' },
        { position: 16, driverNumber: '27', driverCode: 'HUL', driverName: 'Nico Hülkenberg', team: 'Audi', teamColor: '#52E252', q1Time: '1:33.350', bestTime: '1:33.350', tyreCompound: 'Hard', gapToPole: '+1.526s' },
        { position: 17, driverNumber: '77', driverCode: 'BOT', driverName: 'Valtteri Bottas', team: 'Cadillac F1 Team', teamColor: '#D4AF37', q1Time: '1:33.480', bestTime: '1:33.480', tyreCompound: 'Hard', gapToPole: '+1.656s' },
        { position: 18, driverNumber: '11', driverCode: 'PER', driverName: 'Sergio Pérez', team: 'Cadillac F1 Team', teamColor: '#D4AF37', q1Time: '1:33.620', bestTime: '1:33.620', tyreCompound: 'Hard', gapToPole: '+1.796s' },
        { position: 19, driverNumber: '18', driverCode: 'STR', driverName: 'Lance Stroll', team: 'Aston Martin', teamColor: '#229971', q1Time: '1:33.310', bestTime: '1:33.310', tyreCompound: 'Hard', penalty: 'Penalità 40 posizioni (sostituzione componenti Power Unit)', gapToPole: '+1.486s' },
        { position: 20, driverNumber: '55', driverCode: 'SAI', driverName: 'Carlos Sainz', team: 'Williams', teamColor: '#64C4FF', q1Time: '1:32.810', q2Time: '1:32.510', bestTime: '1:32.510', tyreCompound: 'Soft', penalty: 'Penalità 3 posizioni in griglia (impeding su Bottas in Q1)', gapToPole: '+0.686s' },
      ]
    },
    sessions: [
      { id: 'esp-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-09-11T11:30:00Z', endTime: '2026-09-11T12:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & NOW', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'esp-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-09-11T15:00:00Z', endTime: '2026-09-11T16:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & NOW', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'esp-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-09-12T10:30:00Z', endTime: '2026-09-12T11:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & NOW', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'esp-quali', type: 'qualifying', name: 'Qualifiche Ufficiali Spagna', shortName: 'QUALIFICA', startTime: '2026-09-12T14:00:00Z', endTime: '2026-09-12T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & Sky Sport Uno', skyLive: true, tv8Broadcast: 'Differita ore 18:30 su TV8 (Ch. 8)', tv8Live: false },
      { id: 'esp-race', type: 'race', name: 'Gara - Gran Premio di Spagna', shortName: 'GARA', startTime: '2026-09-13T13:00:00Z', endTime: '2026-09-13T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207), Sky Sport Uno & NOW', skyLive: true, tv8Broadcast: 'Differita ore 18:00 su TV8 (Ch. 8)', tv8Live: false }
    ]
  },
  {
    id: 'azerbaijan',
    round: 15,
    season: 2026,
    name: 'Gran Premio d\'Azerbaijan',
    officialName: 'FORMULA 1 AZERBAIJAN GRAND PRIX 2026',
    country: 'Azerbaigian',
    countryCode: 'AZ',
    city: 'Baku',
    circuitName: 'Baku City Circuit',
    circuitId: 'baku',
    circuitLengthKm: 6.003,
    laps: 51,
    raceDistanceKm: 306.049,
    lapRecord: { time: '1:43.009', driver: 'Charles Leclerc', year: '2019' },
    isSprintWeekend: false,
    status: 'upcoming',
    weather: { tempC: 26, condition: 'Vento dal Mar Caspio', rainChancePercent: 10, icon: 'sun' },
    skyNotes: 'ATTENZIONE: Weekend anticipato! GARA DI SABATO 26 SETTEMBRE per rispetto del Giorno della Memoria Nazionale in Azerbaijan (27 Settembre).',
    sessions: [
      { id: 'aze-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-09-24T09:30:00Z', endTime: '2026-09-24T10:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & NOW', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'aze-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-09-24T13:00:00Z', endTime: '2026-09-24T14:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & NOW', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'aze-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-09-25T08:30:00Z', endTime: '2026-09-25T09:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & NOW', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'aze-quali', type: 'qualifying', name: 'Qualifiche Ufficiali Baku', shortName: 'QUALIFICA', startTime: '2026-09-25T12:00:00Z', endTime: '2026-09-25T13:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & Sky Sport Uno', skyLive: true, tv8Broadcast: 'Differita ore 17:00 su TV8 (Ch. 8)', tv8Live: false },
      { id: 'aze-race', type: 'race', name: 'Gara - GP d\'Azerbaijan (Sabato)', shortName: 'GARA', startTime: '2026-09-26T11:00:00Z', endTime: '2026-09-26T13:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207), Sky Sport Uno & NOW', skyLive: true, tv8Broadcast: 'Differita ore 16:30 su TV8 (Ch. 8)', tv8Live: false }
    ]
  },
  {
    id: 'singapore',
    round: 16,
    season: 2026,
    name: 'Gran Premio di Singapore',
    officialName: 'FORMULA 1 SINGAPORE GRAND PRIX 2026',
    country: 'Singapore',
    countryCode: 'SG',
    city: 'Marina Bay',
    circuitName: 'Marina Bay Street Circuit',
    circuitId: 'marina_bay',
    circuitLengthKm: 4.940,
    laps: 62,
    raceDistanceKm: 306.143,
    lapRecord: { time: '1:34.486', driver: 'Daniel Ricciardo', year: '2024' },
    isSprintWeekend: false,
    status: 'upcoming',
    weather: { tempC: 31, condition: 'Tropicale notturno', rainChancePercent: 40, icon: 'cloud-rain' },
    skyNotes: 'La spettacolare notturna tra i grattacieli di Marina Bay.',
    sessions: [
      { id: 'sgp-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-10-09T09:30:00Z', endTime: '2026-10-09T10:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'sgp-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-10-09T13:00:00Z', endTime: '2026-10-09T14:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'sgp-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-10-10T09:30:00Z', endTime: '2026-10-10T10:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'sgp-quali', type: 'qualifying', name: 'Qualifiche Ufficiali Singapore', shortName: 'QUALIFICA', startTime: '2026-10-10T13:00:00Z', endTime: '2026-10-10T14:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false },
      { id: 'sgp-race', type: 'race', name: 'Gara - GP di Singapore', shortName: 'GARA', startTime: '2026-10-11T12:00:00Z', endTime: '2026-10-11T14:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 18:30', tv8Live: false }
    ]
  },
  {
    id: 'austin',
    round: 17,
    season: 2026,
    name: 'Gran Premio degli Stati Uniti',
    officialName: 'FORMULA 1 UNITED STATES GRAND PRIX 2026',
    country: 'Stati Uniti',
    countryCode: 'US',
    city: 'Austin, Texas',
    circuitName: 'Circuit of the Americas (COTA)',
    circuitId: 'cota',
    circuitLengthKm: 5.513,
    laps: 56,
    raceDistanceKm: 308.405,
    lapRecord: { time: '1:36.169', driver: 'Charles Leclerc', year: '2019' },
    isSprintWeekend: true,
    status: 'upcoming',
    weather: { tempC: 27, condition: 'Soleggiato texano', rainChancePercent: 15, icon: 'sun' },
    skyNotes: 'Sprint Weekend ad Austin con la salita di Curva 1!',
    sessions: [
      { id: 'usa-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-10-23T17:30:00Z', endTime: '2026-10-23T18:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'usa-sprint-quali', type: 'sprint_qualifying', name: 'Sprint Qualifying Austin', shortName: 'SPRINT QUALI', startTime: '2026-10-23T21:30:00Z', endTime: '2026-10-23T22:14:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 23:30', tv8Live: false },
      { id: 'usa-sprint', type: 'sprint', name: 'Gara Sprint Austin', shortName: 'SPRINT', startTime: '2026-10-24T18:00:00Z', endTime: '2026-10-24T19:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 20:30', tv8Live: false },
      { id: 'usa-quali', type: 'qualifying', name: 'Qualifiche Gara Austin', shortName: 'QUALIFICA', startTime: '2026-10-24T22:00:00Z', endTime: '2026-10-24T23:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 23:45', tv8Live: false },
      { id: 'usa-race', type: 'race', name: 'Gara - GP degli USA', shortName: 'GARA', startTime: '2026-10-25T19:00:00Z', endTime: '2026-10-25T21:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 22:30', tv8Live: false }
    ]
  },
  {
    id: 'mexico',
    round: 18,
    season: 2026,
    name: 'Gran Premio di Città del Messico',
    officialName: 'FORMULA 1 GRAN PREMIO DE LA CIUDAD DE MÉXICO 2026',
    country: 'Messico',
    countryCode: 'MX',
    city: 'Città del Messico',
    circuitName: 'Autódromo Hermanos Rodríguez',
    circuitId: 'rodriguez',
    circuitLengthKm: 4.304,
    laps: 71,
    raceDistanceKm: 305.354,
    lapRecord: { time: '1:17.774', driver: 'Valtteri Bottas', year: '2021' },
    isSprintWeekend: false,
    status: 'upcoming',
    weather: { tempC: 24, condition: 'Parzialmente Nuvoloso', rainChancePercent: 20, icon: 'cloud-sun' },
    skyNotes: 'A 2.200 metri di altitudine con il mitico passaggio nello stadio Foro Sol!',
    sessions: [
      { id: 'mex-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-10-30T18:30:00Z', endTime: '2026-10-30T19:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'mex-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-10-30T22:00:00Z', endTime: '2026-10-30T23:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'mex-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-10-31T17:30:00Z', endTime: '2026-10-31T18:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'mex-quali', type: 'qualifying', name: 'Qualifiche Ufficiali Messico', shortName: 'QUALIFICA', startTime: '2026-10-31T21:00:00Z', endTime: '2026-10-31T22:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 23:00', tv8Live: false },
      { id: 'mex-race', type: 'race', name: 'Gara - GP del Messico', shortName: 'GARA', startTime: '2026-11-01T20:00:00Z', endTime: '2026-11-01T22:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 22:30', tv8Live: false }
    ]
  },
  {
    id: 'brazil',
    round: 19,
    season: 2026,
    name: 'Gran Premio di San Paolo (Interlagos)',
    officialName: 'FORMULA 1 GRANDE PRÊMIO DE SÃO PAULO 2026',
    country: 'Brasile',
    countryCode: 'BR',
    city: 'San Paolo',
    circuitName: 'Autódromo José Carlos Pace (Interlagos)',
    circuitId: 'interlagos',
    circuitLengthKm: 4.309,
    laps: 71,
    raceDistanceKm: 305.879,
    lapRecord: { time: '1:10.540', driver: 'Valtteri Bottas', year: '2018' },
    isSprintWeekend: true,
    status: 'upcoming',
    weather: { tempC: 25, condition: 'Rovesci pomeridiani', rainChancePercent: 55, icon: 'cloud-rain' },
    skyNotes: 'La leggendaria Esse di Senna e la pioggia tropicale di Interlagos.',
    sessions: [
      { id: 'bra-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-11-06T14:30:00Z', endTime: '2026-11-06T15:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'bra-sprint-quali', type: 'sprint_qualifying', name: 'Sprint Qualifying Brasile', shortName: 'SPRINT QUALI', startTime: '2026-11-06T18:30:00Z', endTime: '2026-11-06T19:14:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 21:30', tv8Live: false },
      { id: 'bra-sprint', type: 'sprint', name: 'Gara Sprint Interlagos', shortName: 'SPRINT', startTime: '2026-11-07T14:00:00Z', endTime: '2026-11-07T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 17:30', tv8Live: false },
      { id: 'bra-quali', type: 'qualifying', name: 'Qualifiche Gara Brasile', shortName: 'QUALIFICA', startTime: '2026-11-07T18:00:00Z', endTime: '2026-11-07T19:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 21:00', tv8Live: false },
      { id: 'bra-race', type: 'race', name: 'Gara - GP del Brasile', shortName: 'GARA', startTime: '2026-11-08T17:00:00Z', endTime: '2026-11-08T19:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 21:30', tv8Live: false }
    ]
  },
  {
    id: 'las-vegas',
    round: 20,
    season: 2026,
    name: 'Gran Premio di Las Vegas',
    officialName: 'FORMULA 1 LAS VEGAS GRAND PRIX 2026',
    country: 'Stati Uniti',
    countryCode: 'US',
    city: 'Las Vegas, Nevada',
    circuitName: 'Las Vegas Strip Circuit',
    circuitId: 'las_vegas',
    circuitLengthKm: 6.201,
    laps: 50,
    raceDistanceKm: 309.958,
    lapRecord: { time: '1:35.490', driver: 'Oscar Piastri', year: '2023' },
    isSprintWeekend: false,
    status: 'upcoming',
    weather: { tempC: 12, condition: 'Freddo notturno del deserto', rainChancePercent: 0, icon: 'sun' },
    skyNotes: 'A tutta velocità sulla Strip illuminata tra i casinò.',
    sessions: [
      { id: 'lvs-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-11-20T02:30:00Z', endTime: '2026-11-20T03:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'lvs-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-11-20T06:00:00Z', endTime: '2026-11-20T07:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'lvs-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-11-21T02:30:00Z', endTime: '2026-11-21T03:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'lvs-quali', type: 'qualifying', name: 'Qualifiche Ufficiali Las Vegas', shortName: 'QUALIFICA', startTime: '2026-11-21T06:00:00Z', endTime: '2026-11-21T07:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 14:00', tv8Live: false },
      { id: 'lvs-race', type: 'race', name: 'Gara - GP di Las Vegas', shortName: 'GARA', startTime: '2026-11-22T06:00:00Z', endTime: '2026-11-22T08:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 14:00', tv8Live: false }
    ]
  },
  {
    id: 'qatar',
    round: 21,
    season: 2026,
    name: 'Gran Premio del Qatar',
    officialName: 'FORMULA 1 QATAR AIRWAYS QATAR GRAND PRIX 2026',
    country: 'Qatar',
    countryCode: 'QA',
    city: 'Lusail',
    circuitName: 'Lusail International Circuit',
    circuitId: 'lusail',
    circuitLengthKm: 5.419,
    laps: 57,
    raceDistanceKm: 308.611,
    lapRecord: { time: '1:24.319', driver: 'Max Verstappen', year: '2023' },
    isSprintWeekend: true,
    status: 'upcoming',
    weather: { tempC: 28, condition: 'Notturna calda', rainChancePercent: 0, icon: 'sun' },
    skyNotes: 'Weekend Sprint con altissimi carichi laterali sulle gomme Pirelli.',
    sessions: [
      { id: 'qat-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-11-27T13:30:00Z', endTime: '2026-11-27T14:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'qat-sprint-quali', type: 'sprint_qualifying', name: 'Sprint Qualifying Qatar', shortName: 'SPRINT QUALI', startTime: '2026-11-27T17:30:00Z', endTime: '2026-11-27T18:14:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 20:00', tv8Live: false },
      { id: 'qat-sprint', type: 'sprint', name: 'Gara Sprint Qatar', shortName: 'SPRINT', startTime: '2026-11-28T14:00:00Z', endTime: '2026-11-28T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 17:00', tv8Live: false },
      { id: 'qat-quali', type: 'qualifying', name: 'Qualifiche Gara Qatar', shortName: 'QUALIFICA', startTime: '2026-11-28T18:00:00Z', endTime: '2026-11-28T19:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 21:00', tv8Live: false },
      { id: 'qat-race', type: 'race', name: 'Gara - GP del Qatar', shortName: 'GARA', startTime: '2026-11-29T16:00:00Z', endTime: '2026-11-29T18:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Differita ore 19:30', tv8Live: false }
    ]
  },
  {
    id: 'abu-dhabi',
    round: 22,
    season: 2026,
    name: 'Gran Premio di Abu Dhabi',
    officialName: 'FORMULA 1 ABU DHABI GRAND PRIX 2026',
    country: 'Emirati Arabi Uniti',
    countryCode: 'AE',
    city: 'Yas Marina, Abu Dhabi',
    circuitName: 'Yas Marina Circuit',
    circuitId: 'yas_marina',
    circuitLengthKm: 5.281,
    laps: 58,
    raceDistanceKm: 306.183,
    lapRecord: { time: '1:26.103', driver: 'Max Verstappen', year: '2021' },
    isSprintWeekend: false,
    status: 'upcoming',
    weather: { tempC: 27, condition: 'Tramonto Sereno', rainChancePercent: 0, icon: 'sun' },
    skyNotes: 'Il gran finale di stagione a Yas Marina: fuochi d\'artificio e incoronazione iridata!',
    sessions: [
      { id: 'abu-fp1', type: 'fp1', name: 'Prove Libere 1', shortName: 'FP1', startTime: '2026-12-04T09:30:00Z', endTime: '2026-12-04T10:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'abu-fp2', type: 'fp2', name: 'Prove Libere 2', shortName: 'FP2', startTime: '2026-12-04T13:00:00Z', endTime: '2026-12-04T14:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'abu-fp3', type: 'fp3', name: 'Prove Libere 3', shortName: 'FP3', startTime: '2026-12-05T10:30:00Z', endTime: '2026-12-05T11:30:00Z', skyChannel: 'Sky Sport F1 (Ch. 207)', skyLive: true, tv8Broadcast: 'Nessuna trasmissione', tv8Live: false },
      { id: 'abu-quali', type: 'qualifying', name: 'Qualifiche Gran Finale Abu Dhabi', shortName: 'QUALIFICA', startTime: '2026-12-05T14:00:00Z', endTime: '2026-12-05T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207) & TV8', skyLive: true, tv8Broadcast: 'DIRETTA TV8 (Ch. 8) ore 15:00', tv8Live: true },
      { id: 'abu-race', type: 'race', name: 'Gara - Gran Finale ad Abu Dhabi', shortName: 'GARA', startTime: '2026-12-06T13:00:00Z', endTime: '2026-12-06T15:00:00Z', skyChannel: 'Sky Sport F1 (Ch. 207), Sky Sport Uno & TV8', skyLive: true, tv8Broadcast: 'DIRETTA IN CHIARO TV8 ore 14:00', tv8Live: true }
    ]
  }
];

// Fallback base data matching the live official API
export const DRIVERS_STANDINGS_FALLBACK: DriverStanding[] = [
  { position: 1, driverId: 'antonelli', code: 'ANT', number: '12', fullName: 'Andrea Kimi Antonelli', nationality: 'Italia', team: 'Mercedes', teamColor: '#27F4D2', points: 267, wins: 7, podiums: 11, pointsBehind: 0 },
  { position: 2, driverId: 'russell', code: 'RUS', number: '63', fullName: 'George Russell', nationality: 'Gran Bretagna', team: 'Mercedes', teamColor: '#27F4D2', points: 201, wins: 2, podiums: 9, pointsBehind: 66 },
  { position: 3, driverId: 'hamilton', code: 'HAM', number: '44', fullName: 'Lewis Hamilton', nationality: 'Gran Bretagna', team: 'Ferrari', teamColor: '#E80020', points: 191, wins: 1, podiums: 9, pointsBehind: 76 },
  { position: 4, driverId: 'norris', code: 'NOR', number: '4', fullName: 'Lando Norris', nationality: 'Gran Bretagna', team: 'McLaren', teamColor: '#FF8000', points: 171, wins: 2, podiums: 8, pointsBehind: 96 },
  { position: 5, driverId: 'leclerc', code: 'LEC', number: '16', fullName: 'Charles Leclerc', nationality: 'Monaco', team: 'Ferrari', teamColor: '#E80020', points: 155, wins: 1, podiums: 7, pointsBehind: 112 },
  { position: 6, driverId: 'max_verstappen', code: 'VER', number: '1', fullName: 'Max Verstappen', nationality: 'Paesi Bassi', team: 'Red Bull Racing', teamColor: '#3671C6', points: 127, wins: 0, podiums: 6, pointsBehind: 140 },
  { position: 7, driverId: 'piastri', code: 'PIA', number: '81', fullName: 'Oscar Piastri', nationality: 'Australia', team: 'McLaren', teamColor: '#FF8000', points: 116, wins: 0, podiums: 5, pointsBehind: 151 },
  { position: 8, driverId: 'hadjar', code: 'HAD', number: '6', fullName: 'Isack Hadjar', nationality: 'Francia', team: 'Red Bull Racing', teamColor: '#3671C6', points: 71, wins: 0, podiums: 2, pointsBehind: 196 },
  { position: 9, driverId: 'lawson', code: 'LAW', number: '30', fullName: 'Liam Lawson', nationality: 'Nuova Zelanda', team: 'RB', teamColor: '#6692FF', points: 51, wins: 0, podiums: 1, pointsBehind: 216 },
  { position: 10, driverId: 'gasly', code: 'GAS', number: '10', fullName: 'Pierre Gasly', nationality: 'Francia', team: 'Alpine', teamColor: '#FF87BC', points: 41, wins: 0, podiums: 1, pointsBehind: 226 },
  { position: 11, driverId: 'lindblad', code: 'LIN', number: '41', fullName: 'Arvid Lindblad', nationality: 'Gran Bretagna', team: 'RB', teamColor: '#6692FF', points: 29, wins: 0, podiums: 0, pointsBehind: 238 },
  { position: 12, driverId: 'colapinto', code: 'COL', number: '43', fullName: 'Franco Colapinto', nationality: 'Argentina', team: 'Alpine', teamColor: '#FF87BC', points: 21, wins: 0, podiums: 0, pointsBehind: 246 },
  { position: 13, driverId: 'bearman', code: 'BEA', number: '87', fullName: 'Oliver Bearman', nationality: 'Gran Bretagna', team: 'Haas F1 Team', teamColor: '#B6BABD', points: 18, wins: 0, podiums: 0, pointsBehind: 249 },
  { position: 14, driverId: 'bortoleto', code: 'BOR', number: '5', fullName: 'Gabriel Bortoleto', nationality: 'Brasile', team: 'Audi', teamColor: '#52E252', points: 10, wins: 0, podiums: 0, pointsBehind: 257 },
  { position: 15, driverId: 'hulkenberg', code: 'HUL', number: '27', fullName: 'Nico Hülkenberg', nationality: 'Germania', team: 'Audi', teamColor: '#52E252', points: 6, wins: 0, podiums: 0, pointsBehind: 261 },
  { position: 16, driverId: 'sainz', code: 'SAI', number: '55', fullName: 'Carlos Sainz', nationality: 'Spagna', team: 'Williams', teamColor: '#64C4FF', points: 6, wins: 0, podiums: 0, pointsBehind: 261 },
  { position: 17, driverId: 'albon', code: 'ALB', number: '23', fullName: 'Alexander Albon', nationality: 'Thailandia', team: 'Williams', teamColor: '#64C4FF', points: 5, wins: 0, podiums: 0, pointsBehind: 262 },
  { position: 18, driverId: 'ocon', code: 'OCO', number: '31', fullName: 'Esteban Ocon', nationality: 'Francia', team: 'Haas F1 Team', teamColor: '#B6BABD', points: 3, wins: 0, podiums: 0, pointsBehind: 264 },
  { position: 19, driverId: 'alonso', code: 'ALO', number: '14', fullName: 'Fernando Alonso', nationality: 'Spagna', team: 'Aston Martin', teamColor: '#229971', points: 3, wins: 0, podiums: 0, pointsBehind: 264 },
  { position: 20, driverId: 'tsunoda', code: 'TSU', number: '22', fullName: 'Yuki Tsunoda', nationality: 'Giappone', team: 'RB', teamColor: '#6692FF', points: 1, wins: 0, podiums: 0, pointsBehind: 266 },
  { position: 21, driverId: 'stroll', code: 'STR', number: '18', fullName: 'Lance Stroll', nationality: 'Canada', team: 'Aston Martin', teamColor: '#229971', points: 0, wins: 0, podiums: 0, pointsBehind: 267 },
  { position: 22, driverId: 'bottas', code: 'BOT', number: '77', fullName: 'Valtteri Bottas', nationality: 'Finlandia', team: 'Cadillac F1 Team', teamColor: '#D4AF37', points: 0, wins: 0, podiums: 0, pointsBehind: 267 },
  { position: 23, driverId: 'perez', code: 'PER', number: '11', fullName: 'Sergio Pérez', nationality: 'Messico', team: 'Cadillac F1 Team', teamColor: '#D4AF37', points: 0, wins: 0, podiums: 0, pointsBehind: 267 },
];

export const CONSTRUCTORS_STANDINGS_FALLBACK: ConstructorStanding[] = [
  { position: 1, constructorId: 'mercedes', name: 'Mercedes-AMG PETRONAS', nationality: 'Germania', color: '#27F4D2', points: 468, wins: 9, pointsBehind: 0, drivers: ['Andrea Kimi Antonelli', 'George Russell'] },
  { position: 2, constructorId: 'ferrari', name: 'Scuderia Ferrari HP', nationality: 'Italia', color: '#E80020', points: 346, wins: 2, pointsBehind: 122, drivers: ['Lewis Hamilton', 'Charles Leclerc'] },
  { position: 3, constructorId: 'mclaren', name: 'McLaren F1 Team', nationality: 'Regno Unito', color: '#FF8000', points: 287, wins: 2, pointsBehind: 181, drivers: ['Lando Norris', 'Oscar Piastri'] },
  { position: 4, constructorId: 'red_bull', name: 'Red Bull Racing', nationality: 'Austria', color: '#3671C6', points: 204, wins: 0, pointsBehind: 264, drivers: ['Max Verstappen', 'Isack Hadjar'] },
  { position: 5, constructorId: 'rb', name: 'Visa Cash App RB', nationality: 'Italia', color: '#6692FF', points: 75, wins: 0, pointsBehind: 393, drivers: ['Liam Lawson', 'Arvid Lindblad', 'Yuki Tsunoda'] },
  { position: 6, constructorId: 'alpine', name: 'BWT Alpine F1 Team', nationality: 'Francia', color: '#FF87BC', points: 62, wins: 0, pointsBehind: 406, drivers: ['Pierre Gasly', 'Franco Colapinto'] },
  { position: 7, constructorId: 'haas', name: 'MoneyGram Haas F1 Team', nationality: 'Stati Uniti', color: '#B6BABD', points: 21, wins: 0, pointsBehind: 447, drivers: ['Oliver Bearman', 'Esteban Ocon'] },
  { position: 8, constructorId: 'audi', name: 'Audi Formula Racing', nationality: 'Germania', color: '#52E252', points: 16, wins: 0, pointsBehind: 452, drivers: ['Gabriel Bortoleto', 'Nico Hülkenberg'] },
  { position: 9, constructorId: 'williams', name: 'Williams Racing', nationality: 'Regno Unito', color: '#64C4FF', points: 11, wins: 0, pointsBehind: 457, drivers: ['Carlos Sainz', 'Alexander Albon'] },
  { position: 10, constructorId: 'aston_martin', name: 'Aston Martin Aramco', nationality: 'Regno Unito', color: '#229971', points: 3, wins: 0, pointsBehind: 465, drivers: ['Fernando Alonso', 'Lance Stroll'] },
  { position: 11, constructorId: 'cadillac', name: 'Cadillac F1 Team', nationality: 'Stati Uniti', color: '#D4AF37', points: 0, wins: 0, pointsBehind: 468, drivers: ['Valtteri Bottas', 'Sergio Pérez'] }
];

// In-memory cache for live standings
let cacheDrivers: { data: DriverStanding[]; timestamp: number } | null = null;
let cacheConstructors: { data: ConstructorStanding[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 1000; // 1 minute live cache

/**
 * Fetches Live Driver Standings from Official Ergast / Jolpica F1 API
 */
export async function fetchLiveDriverStandings(): Promise<DriverStanding[]> {
  const now = Date.now();
  if (cacheDrivers && (now - cacheDrivers.timestamp) < CACHE_TTL_MS) {
    return cacheDrivers.data;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings.json', {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`Jolpica API status ${res.status}`);

    const json = await res.json();
    const standingsList = json?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings;

    if (!Array.isArray(standingsList) || standingsList.length === 0) {
      throw new Error('Invalid DriverStandings payload');
    }

    const leaderPoints = parseFloat(standingsList[0]?.points || '0');

    const mapped: DriverStanding[] = standingsList.map((item: any, idx: number) => {
      const pos = parseInt(item.position || String(idx + 1), 10);
      const points = parseFloat(item.points || '0');
      const wins = parseInt(item.wins || '0', 10);
      const rawConstructorName = item.Constructors?.[0]?.name || 'Unknown';
      const constructorId = item.Constructors?.[0]?.constructorId || '';
      
      let teamName = rawConstructorName;
      if (teamName === 'Red Bull') teamName = 'Red Bull Racing';
      if (teamName === 'RB F1 Team') teamName = 'RB';
      if (teamName === 'Alpine F1 Team') teamName = 'Alpine';
      if (teamName === 'Haas F1 Team') teamName = 'Haas F1 Team';

      const teamColor = TEAM_COLORS[teamName] || TEAM_COLORS[rawConstructorName] || '#E80020';

      const driver = item.Driver;
      const fullName = `${driver.givenName} ${driver.familyName}`;
      const code = driver.code || driver.familyName.substring(0, 3).toUpperCase();
      const number = driver.permanentNumber || String(driver.number || '0');

      return {
        position: pos,
        driverId: driver.driverId,
        code,
        number,
        fullName,
        nationality: driver.nationality || 'FIA',
        team: teamName,
        teamColor,
        points,
        wins,
        podiums: Math.max(wins, Math.floor(points / 25)),
        pointsBehind: Math.max(0, leaderPoints - points),
      };
    });

    cacheDrivers = { data: mapped, timestamp: now };
    return mapped;
  } catch (error) {
    console.warn('Fallback to updated 2026 driver standings:', error);
    return DRIVERS_STANDINGS_FALLBACK;
  }
}

/**
 * Fetches Live Constructor Standings from Official Ergast / Jolpica F1 API
 */
export async function fetchLiveConstructorStandings(): Promise<ConstructorStanding[]> {
  const now = Date.now();
  if (cacheConstructors && (now - cacheConstructors.timestamp) < CACHE_TTL_MS) {
    return cacheConstructors.data;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch('https://api.jolpi.ca/ergast/f1/current/constructorStandings.json', {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`Jolpica API status ${res.status}`);

    const json = await res.json();
    const standingsList = json?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings;

    if (!Array.isArray(standingsList) || standingsList.length === 0) {
      throw new Error('Invalid ConstructorStandings payload');
    }

    const leaderPoints = parseFloat(standingsList[0]?.points || '0');

    const mapped: ConstructorStanding[] = standingsList.map((item: any, idx: number) => {
      const pos = parseInt(item.position || String(idx + 1), 10);
      const points = parseFloat(item.points || '0');
      const wins = parseInt(item.wins || '0', 10);
      const constructor = item.Constructor;
      const rawName = constructor.name;
      const constructorId = constructor.constructorId;

      let displayName = rawName;
      if (constructorId === 'mercedes') displayName = 'Mercedes-AMG PETRONAS';
      if (constructorId === 'ferrari') displayName = 'Scuderia Ferrari HP';
      if (constructorId === 'mclaren') displayName = 'McLaren F1 Team';
      if (constructorId === 'red_bull') displayName = 'Red Bull Racing';
      if (constructorId === 'rb') displayName = 'Visa Cash App RB';
      if (constructorId === 'alpine') displayName = 'BWT Alpine F1 Team';
      if (constructorId === 'haas') displayName = 'MoneyGram Haas F1 Team';
      if (constructorId === 'audi') displayName = 'Audi Formula Racing';
      if (constructorId === 'williams') displayName = 'Williams Racing';
      if (constructorId === 'aston_martin') displayName = 'Aston Martin Aramco';

      const color = TEAM_COLORS[rawName] || TEAM_COLORS[displayName] || '#E80020';
      const drivers = CONSTRUCTOR_DRIVERS_MAP[constructorId] || [constructor.nationality];

      return {
        position: pos,
        constructorId,
        name: displayName,
        nationality: constructor.nationality || 'FIA',
        color,
        points,
        wins,
        pointsBehind: Math.max(0, leaderPoints - points),
        drivers,
      };
    });

    cacheConstructors = { data: mapped, timestamp: now };
    return mapped;
  } catch (error) {
    console.warn('Fallback to updated 2026 constructor standings:', error);
    return CONSTRUCTORS_STANDINGS_FALLBACK;
  }
}

/**
 * Generates RFC 5545 compliant iCalendar string with custom 30m & 15m VALARM reminders
 */
export function generateIcsCalendar(
  grandPrixList: GrandPrix[],
  config: CalendarExportConfig,
  domain: string = 'f1calendar.local'
): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//F1 Sky Sport Live Calendar 2026//IT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:F1 2026 - Calendario e Dirette Sky Sport F1',
    'X-WR-CALDESC:Tutte le sessioni del Campionato Mondiale di Formula 1 2026 (Prove Libere, Qualifiche, Sprint e Gara) con orari e canali Sky Sport F1 HD / TV8.',
    'X-WR-TIMEZONE:Europe/Rome',
  ];

  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  for (const gp of grandPrixList) {
    for (const session of gp.sessions) {
      if (session.type.startsWith('fp') && !config.includeFp) continue;
      if (session.type.startsWith('sprint') && !config.includeSprint) continue;
      if (session.type === 'qualifying' && !config.includeQuali) continue;
      if (session.type === 'race' && !config.includeRace) continue;

      const startDate = new Date(session.startTime);
      const endDate = new Date(session.endTime);

      const dtStart = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const dtEnd = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const uid = `f1-${gp.id}-${session.id}-${gp.season}@${domain}`;

      let summaryEmoji = '🏁';
      if (session.type.startsWith('fp')) summaryEmoji = '⏱️';
      if (session.type.startsWith('sprint')) summaryEmoji = '⚡';
      if (session.type === 'qualifying') summaryEmoji = '🏎️';

      const summary = `${summaryEmoji} F1 2026: ${gp.name} - ${session.name}`;
      
      let description = `🏆 Evento: ${gp.officialName}\\n`;
      description += `📍 Circuito: ${gp.circuitName} (${gp.city}, ${gp.country})\\n`;
      if (config.includeSkyInfo) {
        description += `📺 Sky Sport: ${session.skyChannel} (Diretta HD e streaming NOW)\\n`;
      }
      if (config.includeTv8Info) {
        description += `📺 TV8: ${session.tv8Broadcast}\\n`;
      }
      if (gp.skyNotes) {
        description += `ℹ️ Info: ${gp.skyNotes}\\n`;
      }
      description += `🔔 Promemoria automatici impostati a 30m e 15m prima della sessione.`;

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${now}`);
      lines.push(`DTSTART:${dtStart}`);
      lines.push(`DTEND:${dtEnd}`);
      lines.push(`SUMMARY:${summary}`);
      lines.push(`DESCRIPTION:${description}`);
      lines.push(`LOCATION:${gp.circuitName}, ${gp.city}, ${gp.country}`);
      lines.push('STATUS:CONFIRMED');
      lines.push('TRANSP:OPAQUE');

      // VALARM 30 Minutes Before
      if (config.remind30Min) {
        lines.push('BEGIN:VALARM');
        lines.push('TRIGGER:-PT30M');
        lines.push('ACTION:DISPLAY');
        lines.push(`DESCRIPTION:🏎️ Promemoria F1 2026: ${session.name} (${gp.name}) inizia tra 30 minuti! Sintonizzati su ${session.skyChannel}`);
        lines.push('END:VALARM');
      }

      // VALARM 15 Minutes Before
      if (config.remind15Min) {
        lines.push('BEGIN:VALARM');
        lines.push('TRIGGER:-PT15M');
        lines.push('ACTION:DISPLAY');
        lines.push(`DESCRIPTION:🚨 F1 2026 LIVE: ${session.name} tra 15 minuti su Sky Sport F1! Pit-lane e semafori pronti.`);
        lines.push('END:VALARM');
      }

      lines.push('END:VEVENT');
    }
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
