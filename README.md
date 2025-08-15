# 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Bonsai Highland Games

Eine Progressive Web App (PWA) für die Verwaltung von Highland Games Events. Entwickelt mit Vite, React, TypeScript und modernen Web-Technologien.

## ✨ Features

- **Progressive Web App** - Installierbar und offline-fähig
- **Mobile-First Design** - Optimiert für Smartphones und Tablets
- **Clan-System** - 6 verschiedene schottische Clans zur Auswahl
- **Spielverwaltung** - Timer, Texteingabe und Foto-Upload für verschiedene Highland Games
- **Persistente Daten** - Alle Daten werden lokal in IndexedDB gespeichert
- **Responsive Design** - Funktioniert auf allen Geräten

## 🏗️ Technologie-Stack

- **Framework**: Vite + React 19 + TypeScript
- **Routing**: TanStack Router (File-based)
- **State Management**: Zustand mit Persistierung
- **Storage**: LocalForage (IndexedDB)
- **PWA**: vite-plugin-pwa + Workbox
- **Styling**: Tailwind CSS + Shadcn/ui
- **Icons**: Lucide React

## 🚀 Installation & Start

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktionsbuild erstellen
npm run build

# Produktionsbuild testen
npm run serve
```

## 📱 Routen-Struktur

- **`/`** - Startbildschirm mit "Los geht's" Button
- **`/clan`** - Grid mit 6 Clans zur Auswahl
- **`/login`** - Passworteingabe für gewählten Clan
- **`/schedule`** - Clanspezifischer Zeitplan mit klickbaren Spielkarten
- **`/game/:slug`** - Generische Spielseite mit Timer, Textfeld und Foto-Upload

## 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Clans & Demo-Passwörter

| Clan | Passwort |
|------|----------|
| MacLeod | highland1 |
| Campbell | highland2 |
| Fraser | highland3 |
| Sinclair | highland4 |
| MacKenzie | highland5 |
| Gordon | highland6 |

## 🎮 Highland Games

Die App unterstützt verschiedene traditionelle Highland Games:

1. **Caber Toss** (Baumstammwerfen) - Texteingabe + Fotos
2. **Hammer Throw** (Hammerwurf) - Texteingabe + Fotos
3. **Stone Put** (Steinstoßen) - Texteingabe + Fotos
4. **Weight Throw** (Gewichtswurf) - Texteingabe + Fotos
5. **Hill Race** (Berglauf) - Timer + Fotos
6. **Tug of War** (Tauziehen) - Texteingabe + Fotos

## 💾 Datenpersistierung

- **Zustand Store**: Speichert Clan-Auswahl, Login-Status und Spielergebnisse
- **IndexedDB**: Alle Daten werden lokal gespeichert und überleben App-Neustarts
- **Offline-Support**: Die App funktioniert vollständig offline nach dem ersten Laden

## 📱 PWA Features

- **Installierbar**: Kann als App auf dem Homescreen installiert werden
- **Offline-fähig**: Funktioniert ohne Internetverbindung
- **Auto-Update**: Benachrichtigt über verfügbare Updates
- **App-ähnliche Erfahrung**: Vollbild-Modus ohne Browser-UI

## 🎨 Mobile-First Design

- **Große Touch-Targets**: Mindestens 44px für optimale Bedienbarkeit
- **Responsive Layout**: Automatische Anpassung an verschiedene Bildschirmgrößen
- **Gesture-Unterstützung**: Tap-Feedback und Animationen
- **iOS/Android Kompatibilität**: Native App-ähnliche Erfahrung

## 🛠️ Entwicklung

Das Projekt nutzt moderne Web-Standards und Best Practices:

- **TypeScript**: Typsicherheit für bessere Entwicklererfahrung
- **ESLint**: Code-Qualität und Konsistenz
- **Prettier**: Automatische Code-Formatierung
- **Hot Reload**: Sofortige Aktualisierung bei Änderungen
- **Tree Shaking**: Optimierte Bundle-Größe

## 📊 Performance

- **Code Splitting**: Automatische Route-basierte Code-Aufteilung
- **Caching**: Intelligentes Caching für bessere Ladezeiten
- **Bundle Optimization**: Minimierte JavaScript/CSS-Dateien
- **Image Optimization**: Responsive Bilder mit WebP-Support

## 🔧 Anpassung

Die App ist modular aufgebaut und lässt sich einfach erweitern:

- **Neue Clans**: Einfach in `src/lib/store.ts` hinzufügen
- **Neue Spiele**: Games-Array in der Store-Konfiguration erweitern
- **Custom Styling**: Tailwind-Klassen oder CSS-Variablen anpassen
- **Zusätzliche Features**: Neue Routen und Komponenten hinzufügen

---

**Viel Spaß bei den Highland Games! 🏆**