# Glossary Map

How Much Agentic Kata has one context per service. Each owns its vocabulary in its own `GLOSSARY.md`.

## Contexts

- [Catalog](./services/catalog/GLOSSARY.md): the question bank; draws questions for a game without repeating them
- [Games](./services/games/GLOSSARY.md): players gathered behind a code; who is in a game, who hosts it and which phase it is in
- [Rounds](./services/rounds/GLOSSARY.md): each question played; estimates, deadline, reveal and who the impostor is
- [Scoring](./services/scoring/GLOSSARY.md): the points every player earns per round and the scoreboard
- [Impostor](./services/impostor/GLOSSARY.md): the vote after the reveal and its verdict

## Relationships

- **Rounds → Catalog**: Rounds asks the Catalog to draw the next question of a game over HTTP (`@hmk/contracts/catalog`).
- **Games → Rounds**: Games tells Rounds to start each round, with the game's players and settings, and asks it for the current round's phase.
- **Games → Impostor**: Games asks Impostor for the phase of the vote.
- **Impostor → Rounds**: Impostor asks Rounds who the impostor of a round is and who played it.
- **Scoring → Rounds**: Scoring asks Rounds for each round's solution and estimates.
- **Scoring → Impostor**: Scoring asks Impostor for each round's verdict and votes.
- Rounds never asks Games, and Impostor never asks Scoring: the graph has no cycles (ADR-0003).
