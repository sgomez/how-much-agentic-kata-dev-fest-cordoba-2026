# How Much Agentic Kata

Starter repository for a two-hour coding kata: build _A ojo_, an online clone of the Spanish party game [Cuánto Crees](https://cuantocrees.com/), where every player uses their own phone.

A host creates a game and players join it with its code. Each round shows a numeric question with a unit; everyone estimates it on a ruler before a deadline; then the solution is revealed. The closest estimate scores 3 points, an exact hit 2 more, and ties score the same. In impostor mode (on by default), one random player per round sees only the unit, and after the reveal the others vote for who the impostor was.

### Game rules

The host picks the settings on «Nueva partida», opened from the home (Patterns/02 Home · NewGame): number of rounds (5 by default), seconds per round (30), impostor mode (**on by default**, so a host who changes nothing plays with an impostor) and question packs (all). They do not change once the game exists, and the lobby shows them read-only. If time runs short, the games group builds only the impostor switch and leaves the rest at their defaults. The acceptance tests create games with `impostor` and `roundSeconds` (3-second rounds, some cases without an impostor).

Fixed, whatever the settings: a game needs **at least 3 players** to start. **The impostor does not vote**: their vote would always go to an innocent. Nobody votes for themselves. A player can change their pick until they tap «Votar»; then the vote is final. The voting screen shows the question, its answer and every player's estimate. The voting ends when every other player has voted or its deadline passes, and no screen says who has not voted yet.

Four groups build it in parallel, each owning one service and its screens: `games`, `rounds`, `scoring` and `impostor`. The `gateway`, the `catalog` (a finished reference service), the shared packages, the web shell and the acceptance test DSL are ready-made. Agents: start with [AGENTS.md](AGENTS.md).

## Prerequisites

- Node.js 24 (`.nvmrc`; with nvm: `nvm use`)
- pnpm 11 (`corepack enable` picks the version pinned in `package.json`)
- Optional: [ngrok](https://ngrok.com/) to let phones outside your network play

No Docker and no database: all state lives in memory.

## Quickstart

```sh
pnpm install
pnpm dev
```

Open http://localhost:5173 and pick a nickname: you land on `/`, the games group's home (create or join a game), still a placeholder. While you build, http://localhost:5173/dev has the in-game screen previews and should say the catalog is connected; the game is finished when nobody needs `/dev` to play it. The catalog serves the questions in `data/questions.json`; validate any edit with `pnpm catalog:validate data/questions.json`.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Runs the gateway, every service (with watch) and the Vite dev server, in parallel. The catalog runs in test mode. |
| `pnpm start` | Builds the web app and runs every service; the gateway serves the app on http://localhost:3000. |
| `pnpm check` | The gate: `oxfmt --check`, `oxlint`, `tsc -b`, dependency-cruiser and the unit tests. Must be green before anything is done. |
| `pnpm fix` | Formats and applies lint fixes. |
| `pnpm test` | Unit and route tests of every package (Vitest projects). |
| `pnpm acceptance` | Player-language acceptance tests against the running system. Needs `pnpm dev` running in another terminal. |
| `pnpm depcruise` | Checks the architecture rules and explains how to fix each violation. |
| `pnpm storybook` | The `@hmk/ui` design system on http://localhost:6006, with example screens under `Patterns/`. |
| `pnpm catalog:validate <file>` | Checks a questions file against the catalog's schema. |

Git hooks (lefthook, installed by `pnpm install`) format, lint and check the architecture of staged files, and require Conventional Commits in English.

### Acceptance tests

`acceptance/` follows the four layers of Dave Farley's acceptance tests:

1. `cases/`: test cases in player language ("the closest estimate scores 3 points").
2. `dsl/`: the language those cases use (`newGame`, `game.estimate`, `game.waitForReveal`...). It only contains what a player sees or does.
3. `dsl/drivers.ts` and `drivers/`: one driver per capability. `drivers/<group>.ts` belongs to each group and starts as a `PendingContract`, so the first runs read as a board of what is missing.
4. The running system, reached only through the gateway.

Run `pnpm dev` in one terminal and `pnpm acceptance` in another.

## Layout

```
how-much-agentic-kata/
├─ AGENTS.md             instructions for agents (GEMINI.md points to it)
├─ GLOSSARY-MAP.md       one glossary per service, plus the shared game draft
├─ docs/adr/             architecture decisions
├─ docs/agents/          issue tracker, labels and domain docs for the agent skills
├─ packages/
│  ├─ contracts/         Zod HTTP contracts, one folder per service
│  ├─ auth/              JWT verification (jose + JWKS) and the Hono middleware
│  ├─ kit/               createService, service-to-service client, ports topology
│  └─ ui/                design system + Storybook; index in COMPONENTS.md, open product rules in docs/
├─ services/
│  ├─ gateway/    :3000  Better Auth (anonymous + JWT), proxy to services, serves the built app
│  ├─ catalog/    :3001  reference implementation: packs and decks of questions
│  ├─ games/      :3002  ┐
│  ├─ rounds/     :3003  │ group skeletons
│  ├─ scoring/    :3004  │
│  └─ impostor/   :3005  ┘
├─ apps/web/      :5173  Vite + React Router + TanStack Query + Tailwind; src/features/<group>/
├─ acceptance/           cases, DSL, drivers
├─ tooling/              architecture test and commit message check
└─ data/                 questions.json, the game's questions
```

Ports live in `packages/kit/src/topology.ts`. Each service URL can be overridden with `HMK_<NAME>_URL` (e.g. `HMK_CATALOG_URL`).

## Playing on phones

Run the production build and expose the gateway, which serves the web app and the API on one URL:

```sh
pnpm start
ngrok http 3000
```

Share the `https://…ngrok-free.app` URL. ngrok domains are already trusted by the gateway. For any other host (another tunnel, or `http://<laptop-ip>:5173` on the same Wi-Fi) add it to `HMK_ALLOWED_HOSTS`, comma-separated, e.g. `HMK_ALLOWED_HOSTS=192.168.1.20:5173 pnpm dev`.

Sessions live in the gateway's memory: restarting it signs everyone out, and players just pick their nickname again.

## Environment variables

| Variable | Default | Used by |
| --- | --- | --- |
| `CATALOG_FILE` | `data/questions.json` | catalog: where to read questions from |
| `HMK_TEST_MODE` | `1` in `pnpm dev`, unset in `pnpm start` | catalog: enables `POST /test/next-question` for the acceptance tests |
| `HMK_ALLOWED_HOSTS` | (none) | gateway: extra hosts the app is reached through |
| `BETTER_AUTH_SECRET` | random per start | gateway: signs session cookies |
| `HMK_<NAME>_URL` | `http://localhost:<port>` | everyone: where a process lives |
