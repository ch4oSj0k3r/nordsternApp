<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:git-commit-rules -->

# Git Commit Messages

Always use semantic commit messages in the format `type: description`.

Allowed types: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`, `perf`, `ci`.

<!-- END:git-commit-rules -->

<!-- BEGIN:git-branching-rules -->

# Git Branching Strategy

-   `main` is a protected branch — direct commits and pushes are strictly forbidden
-   All work happens on `feature/*` branches, based on `main`
-   Every change to `main` requires a pull request

## Workflow

1. Create a feature branch from `main`: `git checkout -b feature/name`
2. Develop and commit on the feature branch
3. Open a PR: `feature/*` → `main`
4. After merge, Netlify deploys automatically

Never commit directly to `main`.

<!-- END:git-branching-rules -->

<!-- BEGIN:typescript-rules -->

# TypeScript is mandatory

All source files **must** be `.ts` or `.tsx`. No `.js` or `.jsx` files in `app/`, `components/`, `helpers/`, or `prisma/`.

-   Use `Prisma.GameGetPayload`, `Prisma.PlayerGetPayload`, etc. for typed DB results — no `any` for Prisma data.
-   Extend `next-auth` session and JWT types via `declare module 'next-auth'` and `declare module 'next-auth/jwt'` — no `as any` casts on session/token.
-   Prefer `useRef` over `createRef` in function components.

<!-- END:typescript-rules -->

<!-- BEGIN:prisma-rules -->

# Prisma

-   **CLI and Client must be on the same major version.** Currently both are `^5` (`5.22.0`).
-   `relationMode = "prisma"` (MySQL/PlanetScale — no foreign key constraints in the DB).
-   Use `findUnique` instead of `findFirst` when querying by a unique field.
-   After mutations, always call `revalidatePath` for all affected routes:
    -   `prisma.game.update` → `revalidatePath('/')` + `revalidatePath('/matchplan')`
    -   `prisma.playerStats.upsert` → `revalidatePath('/playerStats')`

<!-- END:prisma-rules -->

<!-- BEGIN:auth-rules -->

# Auth (Auth.js v5)

-   Package: `next-auth@5` (beta). Do **not** downgrade to v4.
-   Strategy: JWT sessions with Credentials Provider — **no** database session storage.
-   Password hashing: **bcryptjs** with cost factor 12. Do **not** use `crypto-js`, `crypto`, or any SHA-based hashing.
-   **No** `@auth/prisma-adapter` — it was intentionally removed. Do not re-add it.
-   `Account`, `Session`, `VerificationToken`, and `SeasonToTeam` models are removed from `schema.prisma` — do not re-add them.

<!-- END:auth-rules -->

<!-- BEGIN:package-manager-rules -->

# Package Manager

Use **pnpm** exclusively. Do not use `npm` or `yarn`.

<!-- END:package-manager-rules -->
