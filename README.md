# nordsternApp

Vereins-App für eine Dart-Mannschaft. Verwaltung von Saisons, Spielen und Tabellen sowie detaillierte Wurfstatistiken für jeden Spieler. Deployed auf Netlify.

## Stack

| Bereich    | Technologie                          |
| ---------- | ------------------------------------ |
| Framework  | Next.js 16 (App Router)              |
| Sprache    | TypeScript                           |
| UI         | React 19                             |
| Styling    | Tailwind CSS v3, DaisyUI 4           |
| Auth       | Auth.js v5 (`next-auth@5`), bcryptjs |
| Datenbank  | MySQL, Prisma ORM v5                 |
| Deployment | Netlify, Node 22                     |

## Lokale Entwicklung

### Voraussetzungen

-   Node.js 22+
-   pnpm
-   MySQL-Datenbank (lokal oder remote)

### Setup

```bash
pnpm install
cp .env .env.local  # Umgebungsvariablen anpassen
pnpm exec prisma generate
pnpm run dev        # http://localhost:3000
```

## Umgebungsvariablen

| Variable       | Beschreibung                                        |
| -------------- | --------------------------------------------------- |
| `DATABASE_URL` | MySQL-Connection-String                             |
| `AUTH_SECRET`  | Auth.js Secret (mind. 32 Zeichen)                   |
| `AUTH_URL`     | Basis-URL der App (z. B. `https://....netlify.app`) |

## Scripts

| Script                  | Beschreibung                      |
| ----------------------- | --------------------------------- |
| `pnpm run dev`          | Entwicklungsserver mit Hot Reload |
| `pnpm run build`        | Produktions-Build                 |
| `pnpm run start`        | Produktionsserver starten         |
| `pnpm run lint`         | ESLint ausführen                  |
| `pnpm run prettier`     | Prettier-Check                    |
| `pnpm run prettier-fix` | Prettier auto-fix                 |

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

Netlify-Build-Command: `pnpm exec prisma generate && pnpm run build`

Umgebungsvariablen werden in Netlify unter **Site settings → Environment variables** gesetzt. Die Node-Version ist zusätzlich in `.nvmrc` und `package.json` (`engines`) auf 22 fixiert.

## Auth & Passwörter

Auth.js v5 mit Credentials Provider und JWT-Sessions (kein Prisma Adapter). Passwörter werden mit **bcryptjs** (cost factor 12) gehasht.

Neuen Passwort-Hash erzeugen:

```bash
node -e "require('bcryptjs').hash('PASSWORT', 12).then(h => console.log(h))"
```

Den Hash direkt in der Datenbank eintragen:

```sql
UPDATE User SET password = '<hash>' WHERE username = '<name>';
```
