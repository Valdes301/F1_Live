import { GrandPrix, Session, CalendarExportConfig } from '../types';

/**
 * Generates a direct Google Calendar Web Intent URL for an individual session
 * Works reliably on Android, iOS, Windows, Mac and Web.
 */
export function createGoogleCalendarUrl(gp: GrandPrix, session: Session): string {
  const startDate = new Date(session.startTime);
  const endDate = new Date(session.endTime);

  // Format UTC dates as YYYYMMDDTHHMMSSZ for maximum compatibility across Google Calendar Web & Apps
  const formatGCalDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const title = `🏎️ F1 ${gp.name}: ${session.name}`;
  const details = 
    `🏆 Evento: ${gp.officialName}\n` +
    `📍 Circuito: ${gp.circuitName} (${gp.city}, ${gp.country})\n` +
    `📺 Sky Sport F1: ${session.skyChannel} (Diretta HD e streaming NOW)\n` +
    `📺 TV8: ${session.tv8Broadcast}\n` +
    `⏱️ Sessione: ${session.name} (Orario Italiano CET/CEST)\n` +
    `🔔 Promemoria consigliati: 30 min e 15 min prima della diretta.`;
  const location = `${gp.circuitName}, ${gp.city}, ${gp.country}`;
  const dates = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: dates,
    details: details,
    location: location,
    crm: 'AVAILABLE',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates direct Google Calendar subscription URL via Webcal / Public Feed
 */
export function getGoogleCalendarSubscribeUrl(config: CalendarExportConfig): string {
  const webcalUrl = getCalendarFeedUrl(config, 'webcal');
  const cleanUrl = webcalUrl.replace(/^webcal:\/\//i, 'https://');
  // Google Calendar add by URL interface
  return `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(cleanUrl)}`;
}

/**
 * Generates downloadable CSV content compatible with Google Calendar & Excel
 */
export function generateGoogleCalendarCsv(grandPrixList: GrandPrix[], config: CalendarExportConfig): string {
  const headers = [
    'Subject',
    'Start Date',
    'Start Time',
    'End Date',
    'End Time',
    'All Day Event',
    'Description',
    'Location',
    'Private'
  ];

  const rows: string[][] = [headers];

  const formatCsvDate = (d: Date) => {
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formatCsvTime = (d: Date) => {
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  for (const gp of grandPrixList) {
    for (const session of gp.sessions) {
      if (session.type.startsWith('fp') && !config.includeFp) continue;
      if (session.type.startsWith('sprint') && !config.includeSprint) continue;
      if (session.type === 'qualifying') {
        if (!config.includeQuali) continue;
      }
      if (session.type === 'race' && !config.includeRace) continue;

      const startDate = new Date(session.startTime);
      const endDate = new Date(session.endTime);

      const subject = `🏎️ F1 2026: ${gp.name} - ${session.name}`;
      const desc = `🏆 ${gp.officialName} | 📺 Sky Sport: ${session.skyChannel} (Diretta HD/NOW) | TV8: ${session.tv8Broadcast} | Promemoria: 30m e 15m prima`;
      const loc = `${gp.circuitName}, ${gp.city}, ${gp.country}`;

      rows.push([
        `"${subject.replace(/"/g, '""')}"`,
        formatCsvDate(startDate),
        formatCsvTime(startDate),
        formatCsvDate(endDate),
        formatCsvTime(endDate),
        'False',
        `"${desc.replace(/"/g, '""')}"`,
        `"${loc.replace(/"/g, '""')}"`,
        'False'
      ]);
    }
  }

  return rows.map(r => r.join(',')).join('\r\n');
}

/**
 * Downloads a single or multiple events as a .ics file directly in the browser
 */
export function downloadFile(filename: string, content: string, mimeType: string = 'text/calendar;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates an ICS string for a single session
 */
export function generateSingleSessionIcs(gp: GrandPrix, session: Session): string {
  const startDate = new Date(session.startTime);
  const endDate = new Date(session.endTime);
  const dtStart = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtEnd = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `f1-${gp.id}-${session.id}-${Date.now()}@f1skycalendar.local`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//F1 Sky Sport Live Calendar 2026//IT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:🏎️ F1 ${gp.name}: ${session.name}`,
    `DESCRIPTION:🏆 ${gp.officialName}\\n📍 ${gp.circuitName}\\n📺 Sky Sport: ${session.skyChannel}\\n📺 TV8: ${session.tv8Broadcast}`,
    `LOCATION:${gp.circuitName}, ${gp.city}, ${gp.country}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    `DESCRIPTION:🏎️ Promemoria F1: ${session.name} (${gp.name}) tra 30 minuti su ${session.skyChannel}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    `DESCRIPTION:🚨 F1 LIVE: ${session.name} tra 15 minuti su Sky Sport F1!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

/**
 * Generates a full subscription link (webcal://) or direct download URL
 */
export function getCalendarFeedUrl(config: CalendarExportConfig, protocol: 'webcal' | 'https' = 'https'): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const params = new URLSearchParams({
    includeFp: String(config.includeFp),
    includeSprint: String(config.includeSprint),
    includeQuali: String(config.includeQuali),
    includeRace: String(config.includeRace),
    remind30Min: String(config.remind30Min),
    remind15Min: String(config.remind15Min),
    includeSkyInfo: String(config.includeSkyInfo),
    includeTv8Info: String(config.includeTv8Info),
  });

  const fullUrl = `${baseUrl}/api/f1/calendar.ics?${params.toString()}`;
  if (protocol === 'webcal') {
    return fullUrl.replace(/^https?:\/\//, 'webcal://');
  }
  return fullUrl;
}

/**
 * Formats date into readable Italian string with explicit Italian timezone (Europe/Rome)
 */
export function formatSessionDate(
  isoString: string, 
  timeZone: string = 'Europe/Rome'
): { day: string; time: string; full: string; dayOfWeek: string; dateNum: string } {
  const date = new Date(isoString);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone,
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  };
  const weekdayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    timeZone,
  };
  const dateNumOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    timeZone,
  };

  const day = new Intl.DateTimeFormat('it-IT', options).format(date);
  const time = new Intl.DateTimeFormat('it-IT', timeOptions).format(date);
  const dayOfWeek = new Intl.DateTimeFormat('it-IT', weekdayOptions).format(date);
  const dateNum = new Intl.DateTimeFormat('it-IT', dateNumOptions).format(date);
  const full = `${day} ${time} (CET/CEST)`;

  return { day, time, full, dayOfWeek, dateNum };
}

/**
 * Gets formatted current time in Italy (Europe/Rome)
 */
export function getItalianCurrentTime(): { timeString: string; dateString: string; tzAbbr: string } {
  const now = new Date();
  const timeString = new Intl.DateTimeFormat('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/Rome'
  }).format(now);

  const dateString = new Intl.DateTimeFormat('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Rome'
  }).format(now);

  // Check daylight saving time
  const isDST = () => {
    const jan = new Date(now.getFullYear(), 0, 1).getTimezoneOffset();
    const jul = new Date(now.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== now.getTimezoneOffset();
  };

  const tzAbbr = isDST() ? 'CEST (UTC+2)' : 'CET (UTC+1)';

  return { timeString, dateString, tzAbbr };
}

/**
 * Calculates remaining time until a date
 */
export function getTimeRemaining(targetIso: string) {
  const targetTime = new Date(targetIso).getTime();
  const total = targetTime - Date.now();
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds, isPast: false };
}

