# 🏎️ F1 2026 Live Calendar & Standings Hub (Sky Sport & TV8)

Applicazione web full-stack moderna e responsive dedicata alla stagione di **Formula 1 2026**. Progettata per gli appassionati italiani, fornisce il calendario completo dei Gran Premi con canali di trasmissione (Sky Sport F1 HD, Sky Sport Uno, NOW e TV8), orari esatti in fuso orario italiano (Europe/Rome), classifiche piloti e costruttori aggiornate in tempo reale, sincronizzazione automatica del calendario su dispositivi personali e supporto Docker/Raspberry Pi.

---

## ✨ Funzionalità Principali

### 📅 1. Calendario Gran Premi e Sessioni F1 2026
- **Copertura Completa**: Tutti i round della stagione 2026, inclusi i weekend tradizionali e i weekend **Sprint**.
- **Orari Italiani Precisi (CEST/CET)**: Orari di inizio e fine per ogni singola sessione:
  - Prove Libere 1, 2 e 3 (FP1, FP2, FP3)
  - Sprint Qualifying e Gara Sprint
  - Qualifiche Ufficiali
  - Gara Domenicale (o eccezionalmente di Sabato, es. GP d'Azerbaigian)
- **Canali TV & Streaming Ufficiali**:
  - **Sky Sport F1 (Canale 207)**, **Sky Sport Uno** e streaming su **NOW** (dirette integrali).
  - Programmazione **TV8** con indicazione chiara delle trasmissioni in diretta o in differita serale.
- **Dettagli Circuito & Meteo**:
  - Lunghezza tracciato, numero di curve, giri totali, record della pista e condizioni meteo previste.
- **Conto alla Rovescia Dinamico**: Hero card che calcola i giorni, le ore, i minuti e i secondi mancanti alla prossima sessione in pista.

---

### 📲 2. Sincronizzazione Calendario (Google Calendar, Apple, Outlook, iCal)
- **Feed Webcal Live / Real-Time**: Iscrizione tramite protocollo `webcal://` o `https://` che aggiorna automaticamente qualsiasi variazione di orario senza dover riesportare il file.
- **Esportazione File `.ics` (RFC 5545 Compliant)**: Download del file iCalendar universale compatibile con iOS, Android, macOS, Windows e Thunderbird.
- **Promemoria Multipli Intelligenti (`VALARM`)**:
  - 🔔 **-30 Minuti**: Allarme con indicazione della sessione e canale Sky Sport.
  - 🚨 **-15 Minuti**: Allarme di pre-partenza con semafori e pit-lane pronti.
- **Aggiunta Rapida con 1 Click**: Pulsante rapido per inserire direttamente la singola sessione su Google Calendar.

---

### 🏆 3. Classifiche Piloti e Costruttori Live
- **Sincronizzazione API Live**: Integrazione con le API ufficiali **Ergast / Jolpica F1 API**.
- **Campionato Mondiale Piloti**:
  - Posizione, punti totali, distacco dal leader, vittorie, podi e livrea ufficiale della scuderia.
- **Campionato Mondiale Costruttori**:
  - Classifica a squadre con piloti ufficiali associati e livree cromatiche personalizzate.
- **Pulsante Sincronizza Rapido**: Per forzare l'aggiornamento istantaneo con cache lato server a breve termine.

---

### 🐳 4. Distribuzione Docker & Raspberry Pi 4/5 (Home Assistant / Local LAN)
- **Porta Dedicata `1950`**: Accessibile via rete locale su `http://raspberrypi.local:1950` (in omaggio all'anno del 1° Gran Premio di Formula 1 della storia a Silverstone).
- **Prestazioni Hardware Illimitate**: Nessun collo di bottiglia o limite di CPU e RAM nel `docker-compose.yml` per risposte istantanee.
- **Immagine Multi-Architettura**:
  - Supporto per `linux/amd64`, `linux/arm64` (Raspberry Pi OS 64-bit, Apple Silicon) e `linux/arm/v7` (Raspberry Pi OS 32-bit).
- **CI/CD GitHub Actions Integrato**: Workflow automatizzato `.github/workflows/docker-build.yml` per la compilazione e il push su Docker Hub ad ogni commit su `main`.

---

## 🛠️ Stack Tecnologico

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Express.js, TypeScript, bundle compilato ultra-veloce con esbuild CommonJS.
- **Feed Motore**: Generatore RFC 5545 iCalendar standard per eventi e allarmi.
- **Container**: Node 20 Alpine, Dockerfile multi-stage leggero (<100MB).

---

## 🚀 Avvio Rapido

### Avvio Locale con Node.js
```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo (porta 3000)
npm run dev

# Compila per la produzione
npm run build

# Avvia l'applicazione compilata
npm start
```

### Avvio con Docker Compose
```bash
# Avvia il container in background sulla porta 1950
docker compose up -d

# Visualizza i log
docker compose logs -f
```

L'app sarà raggiungibile su:
- Web: `http://localhost:1950` (o `http://<IP-DEL-TUO-SERVER>:1950`)
- Feed Calendario iCal: `http://localhost:1950/api/f1/calendar.ics`

---

## ⚙️ Configurazione CI/CD GitHub Actions

Per abilitare il build e push automatico dell'immagine Docker su Docker Hub:

1. Vai nella cartella delle impostazioni del tuo repository GitHub: **Settings > Secrets and variables > Actions**.
2. Aggiungi i seguenti **Repository Secrets**:
   - `DOCKERHUB_USERNAME`: Il tuo nome utente su Docker Hub.
   - `DOCKERHUB_TOKEN`: Il tuo Personal Access Token generato su Docker Hub (con permessi di Read & Write).
3. Ad ogni push sul branch `main`, GitHub Actions compilerà e pubblicherà automaticamente l'immagine `<username>/f1live:latest` per tutte le architetture.

---

## 📄 Licenza
Rilasciato sotto licenza MIT. I loghi, nomi e marchi della Formula 1 e di Sky Sport appartengono ai rispettivi proprietari.
