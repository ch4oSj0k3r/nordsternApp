# nordsternApp

Vereins-App für eine Dart-Mannschaft. Verwaltung von Saisons, Spielen und Tabellen sowie detaillierte Wurfstatistiken für jeden Spieler. Deployed auf Netlify.

## Stack

| Bereich    | Technologie               |
| ---------- | ------------------------- |
| Framework  | Next.js 15 (Pages Router) |
| Sprache    | JavaScript                |
| UI         | React 18                  |
| Styling    | Tailwind CSS v3, DaisyUI  |
| Auth       | NextAuth.js               |
| Datenbank  | MySQL, Prisma ORM         |
| Deployment | Netlify                   |

## Lokale Entwicklung

### Voraussetzungen

-   Node.js 20+
-   pnpm
-   MySQL-Datenbank (lokal oder remote)

### Setup

```bash
pnpm install
cp .env .env.local  # Umgebungsvariablen anpassen
pnpm run dev        # http://localhost:3000
```

## Scripts

| Script              | Beschreibung                      |
| ------------------- | --------------------------------- |
| `pnpm run dev`      | Entwicklungsserver mit Hot Reload |
| `pnpm run build`    | Produktions-Build                 |
| `pnpm run start`    | Produktionsserver starten         |
| `pnpm run lint`     | ESLint ausführen                  |
| `pnpm run prettier` | Prettier-Check                    |

## Branching-Strategie

| Branch      | Zweck                                              |
| ----------- | -------------------------------------------------- |
| `main`      | Protected — Netlify deployed automatisch bei Merge |
| `feature/*` | Feature-Branches, Basis: `main`, via PR in `main`  |

```bash
git checkout -b feature/name
git commit -m "feat: ..."
git push -u origin feature/name
# → Pull Request auf GitHub: feature/* → main
```

## Deployment

Netlify deployed automatisch bei jedem Merge auf `main`. Deploy Previews werden für jeden PR erstellt.

Umgebungsvariablen werden in Netlify unter **Site settings → Environment variables** gesetzt.
