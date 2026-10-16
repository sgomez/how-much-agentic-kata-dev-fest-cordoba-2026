# AGENTS.md

How Much Agentic Kata: an online clone of the party game "Cuánto Crees", built in two hours by four groups. Each group owns one vertical slice: a service, its HTTP contract, its screens and its acceptance driver (`.github/CODEOWNERS`). `README.md` has the layout and the scripts.

## Language

Converse with the user in their language. Everything that goes into the repo or GitHub is English: code, comments, test names, commits, issues, specs, tickets, PRs, ADRs, glossary entries, contract schemas. The one exception is user-facing text in `apps/web`, written in Spanish from Spain (ADR-0004).

## Done means `pnpm check` is green

Run `pnpm check` before declaring anything done: format, lint, types, architecture and unit tests in one go. `pnpm fix` formats and applies lint fixes. An architecture violation prints how to fix it; follow that fix rather than editing `.dependency-cruiser.cjs`. Commits follow Conventional Commits (`feat(games): ...`).

## Ownership

Change only your group's folders: `services/<group>/`, `packages/contracts/src/<group>/`, `apps/web/src/features/<group>/`, `acceptance/drivers/<group>.ts`. Anything shared (`packages/*`, `apps/web/src/shell/`, `acceptance/dsl/`, root config, `docs/`) changes through a PR the other groups review.

## Tickets

`Patterns/` in Storybook (`packages/ui/src/patterns/`) holds exactly the screens the game shows, one per step, in order from 01 Nickname to 11 Errors. Owners: games 02 Home, 03 Lobby and 11 Errors; rounds 04 Round and 05 After sending; scoring 06 Reveal, 09 Scoreboard and 10 Final ranking; impostor 07 Voting and 08 Verdict (01 Nickname is ready-made). A story's Storybook tags also name the groups that feed it data. The stories are the spec of what a player sees: a spec says, for every step its group owns, which Patterns story and frame the phone shows, which variant was chosen for each open decision, and which route of which service feeds every value on it. Every story of a screen your group owns ends up in some ticket, and each ticket names the story and frame it brings to life. A frame left out is a ticket left for later, never a silent gap.

Every ticket is a vertical slice that ends in the game: when it closes, a player sees it on their phone, with real data from your service, through the scene director (or `/games/<code>/preview/<scene>/<round>` until the director exists). Each ticket carries its own piece of service, screen and acceptance driver. Never write a ticket that is only backend, only screens or only the acceptance driver: when time runs out, the screens ticket is the one that gets dropped. The first ticket is the thinnest path that already shows something on the phone.

## Building a service

Before creating a file in a service, find its counterpart in `services/catalog` (the reference implementation) and copy its shape: layer, suffix, constructor style, tests. ADR-0002 explains the shape; ADR-0003 explains why services and phones only poll and never push.

## Building screens

In `apps/web`, build screens only with `@hmk/ui` components; `packages/ui/COMPONENTS.md` indexes them and says which ones each screen needs. The `Patterns/` stories show every screen put together, with each open product rule drawn in all its variants: the group picks one (`packages/ui/docs/open-decisions.md`). Fetch a screen's view with `useView` and send actions with `api` (both in `apps/web/src/shell/`). UI strings are Spanish (Spain).

After the nickname, every player lands on `/`, the games group's home (`Patterns/02 Home`): create a game or join one with its code, then go to `/games/<code>`. `/dev` is a scaffolding panel with the screen previews and a catalog check; nothing in the game links to it, and the game is done when it is played from `/` to the final ranking without opening `/dev`. In-game screens have no routes of their own. The games group's scene director, at `/games/:code`, picks one from the game's state and mounts it through `apps/web/src/features/games/scene-screens.tsx`, which already imports every group's stub from its feature `index.ts`. The props are in `apps/web/src/shell/scene.ts`: the game code, the round number and the director's slots. They are a contract between groups, like the HTTP ones: fill in your stubs and never change their names or props. A screen tied to a round shows the round it receives, and fetches everything else from its own service. To work on a screen before the director exists, open `/games/<code>/preview/<scene>/<round>`. A screen is done when it shows your service's real data in the game, through the director or the preview, not when it looks like its `Patterns/` story.

## Vocabulary

Domain words come from each service's `GLOSSARY.md`, listed in `GLOSSARY-MAP.md`. A question still open lives in the `Open questions` section of the glossary of the group that decides it: settle it with the user before building on one reading.

## Acceptance tests

`pnpm acceptance` runs the player-language cases in `acceptance/cases/` against the running system (`pnpm dev`). A `PendingContract` failure names the driver method to implement in `acceptance/drivers/<group>.ts`. The DSL describes only what a player sees or does.

## Agent skills

### Issue tracker

Issues and PRs live in GitHub, handled with the `gh` CLI; every issue carries its `group:<name>` label. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default triage labels, plus one `group:<name>` label per group. See `docs/agents/triage-labels.md`.

### Domain docs

Multi-context: `GLOSSARY-MAP.md` points to one `GLOSSARY.md` per service; system ADRs in `docs/adr/`. See `docs/agents/domain.md`.
