# Repository Guidelines

## Project Structure & Module Organization
- Root docs: `prd.md` (product) and `tech_solution.md` (architecture). Keep both updated.
- App (planned): Next.js under `src/` with `app/` (or `pages/), `components/`, `lib/`, `styles/`, `public/`.
- Data: Drizzle ORM in `src/db/` (`schema.ts`, `client.ts`), migrations in `drizzle/`.
- Tests: unit in `src/**/__tests__/` or `tests/`; e2e (optional) in `e2e/`.
- Assets: static images/icons in `public/`. Do not store user uploads in git.

## Build, Test, and Development Commands
- `npm run dev`: Start Next.js dev server at `http://localhost:3000`.
- `npm run build`: Production build.
- `npm run start`: Run the built server.
- `npm run lint`: Lint + format check (ESLint, Prettier, Tailwind plugin).
- `npm run test`: Run unit tests (Vitest/Jest).
- `npx drizzle-kit generate`: Generate SQL migrations from `src/db/schema.ts`.
- `npx drizzle-kit push`: Apply migrations to `DATABASE_URL`.
Note: Add these scripts to `package.json` when scaffolding the app.

## Coding Style & Naming Conventions
- Language: TypeScript. Indentation: 2 spaces. Use Prettier defaults.
- Components: PascalCase file names in `src/components/` (e.g., `ResultCard.tsx`).
- Functions/vars: camelCase; routes and files: kebab-case (`app/result-page/route.ts`).
- DB: snake_case for tables/columns; Drizzle schema objects in camelCase.
- Linting: ESLint with `next`, `@typescript-eslint`, and `tailwindcss` plugins.

## Testing Guidelines
- Framework: Vitest or Jest for units; Playwright for e2e (optional).
- Naming: `*.test.ts(x)` colocated or under `__tests__/`.
- Coverage: Aim ≥ 80% for `src/lib/` and rule engine.
- Example: `npm run test -- src/lib/rules/`.

## Commit & Pull Request Guidelines
- Commit style: Conventional Commits (e.g., `feat(rules): add heart-face mapping`).
- PRs must include: clear description, linked issues, screenshots/GIFs for UI, notes on performance (30–60s goal) and privacy (photo handling), and migration notes if DB changes.
- Keep PRs focused and under ~300 lines when possible.

## Security & Configuration Tips
- Secrets in `.env.local`; do not commit. Required keys typically include `AI_API_KEY`, `DATABASE_URL`.
- Do not persist user photos; process in memory or ephemeral storage. Add `uploads/` and temp dirs to `.gitignore`.
- Validate uploads server-side; reject celebrity/others; enforce size/type limits.

## AI API Usage
- Base URL: `https://api.ai-wave.org` (OpenAI-compatible).
- Env var: `REPLICATE_API_KEYS` — supports multiple keys separated by commas (`,`); set on Vercel and use server-side only.
- Models: text `gemini-2.5-flash`; image `gemini-2.5-flash-image-preview`.
- Node example (random key selection):
```ts
import OpenAI from "openai";
const keys = (process.env.REPLICATE_API_KEYS || "").split(",").map(k => k.trim()).filter(Boolean);
const apiKey = keys[Math.floor(Math.random() * Math.max(keys.length, 1))];
const client = new OpenAI({ apiKey, baseURL: "https://api.ai-wave.org" });
await client.chat.completions.create({ model: "gemini-2.5-flash", messages: [{ role: "user", content: "建议发型" }] });
await client.images.generate({ model: "gemini-2.5-flash-image-preview", prompt: "短发示意图" });
```
