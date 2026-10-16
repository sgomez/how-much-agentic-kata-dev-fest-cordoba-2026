# Open product decisions

Each group settles these rules during the workshop. The game's settings are not among them: the host picks them on «Nueva partida» (Patterns/02 Home · NewGame) and the lobby shows them read-only, with "Empezar" disabled under 3 players (Patterns/03 · MinimumPlayers). Voting is not either: nobody votes for themselves, a vote is final once sent, and the screen shows the question, the answer and every estimate (README, "Game rules"). The system takes no side: every variant is a prop or a state, and every variant is drawn side by side in `Patterns/`. Pick one, then pass the matching props.

| Decision | Variant | How to build it | Story |
| --- | --- | --- | --- |
| Change your estimate after sending? | Locked after "Enviar" | `EstimateRuler sentValue={sent} locked` · button `disabled icon="lock"` "Enviado" | Patterns/05 · EditRule |
|  | Editable until the deadline | `EstimateRuler sentValue={sent}` (no `locked`) · button "Cambiar", enabled when `value !== sent` | Patterns/05 · EditRule |
| Round ends early when everyone has answered? | Only at the deadline | Keep the `Countdown` running · `AnswerTracker` says "¡Ya habéis respondido todos!" | Patterns/04 · EndsEarly |
|  | As soon as everyone has answered | Same screen, `BottomActionBar hint="La ronda acaba en cuanto respondáis todos"`; jump to the reveal when the server says so | Patterns/04 · EndsEarly |
| Repeated nickname in a game? | Allowed | `withDistinctNames(players)` → "Ana", "Ana 2". Colours already differ by id | Patterns/03 · RepeatedNicknames |
|  | Rejected on join | `Input error="Ya hay una Lucía en esa partida. Elige otro apodo."` | Patterns/03 · RepeatedNicknames |
| Game capacity | Unlimited | `Badge icon="users"` with the count | Patterns/03 · GameCapacity |
|  | Full game | Badge "20 / 20"; joiners see the "La partida está llena" `EmptyState` | Patterns/03 · GameCapacity |
| What the verdict shows | Only caught or not | `VerdictCard` without `votes` | Patterns/08 · WhatItShows |
|  | Also who voted for whom | `VerdictCard votes={…}` | Patterns/08 · WhatItShows |
| Scoreboard timing | After every round | A `Scoreboard` screen between rounds | Patterns/09 · WhenItAppears |
|  | Only at the end | A short end-of-round screen; `FinalPodium` at the end | Patterns/09 · WhenItAppears |
| Game code format | 4 letters | `CodeInput length={4} alphabet="letters"` | Patterns/02 · CodeFormat |
|  | Other lengths, letters and digits | `CodeInput length={6} alphabet="alphanumeric"` (or `"digits"`); `GameCodeDisplay` fits up to 6 | Patterns/02 · CodeFormat |
| The host leaves | Game closes for everyone | `EmptyState tone="danger" title="Lucía ha cerrado la partida"` | Patterns/03 · HostLeaves |
|  | Another player becomes host | `Toast message="Lucía se ha ido. Ahora el anfitrión eres tú"`; the host controls appear | Patterns/03 · HostLeaves |
| Joining after the start | Rejected | `EmptyState title="Esta partida ya ha empezado"` | Patterns/04 · LateJoin |
|  | Allowed from the next round | "Entras en la siguiente ronda" plus a `PlayerList` | Patterns/04 · LateJoin |
| A player does not answer in time | No estimate | `EstimateRuler disabled`; on the reveal, `value: null` → "Sin respuesta" in `RevealRuler` and `RevealList` | Patterns/05 · TimeUp, Patterns/06 · NoAnswer |
| Does the impostor's estimate compete? | Yes, shown like the rest | A normal entry | Patterns/06 · ImpostorEstimate |
|  | No, shown apart | `excluded: true` (dashed, never closest, listed under "Fuera de concurso") | Patterns/06 · ImpostorEstimate |
|  | No, hidden | Leave the entry out | Patterns/06 · ImpostorEstimate |
| Tie in the impostor vote | Counts as caught | `VerdictCard outcome="caught" detail="Empate a 2 votos: cuenta como pillado"` | Patterns/08 · Tie |
|  | Counts as not caught | `outcome="escaped" detail="Empate a 2 votos: se libra"` | Patterns/08 · Tie |
|  | No verdict | `outcome="none" detail="Empate a 2 votos"` | Patterns/08 · Tie |
| Others score for catching the impostor? | No | Only the impostor's `ScoreDelta` | Patterns/08 · CatchersScore |
|  | Yes | One `ScoreDelta points={1} reason="caught"` per catcher | Patterns/08 · CatchersScore |
| Who moves to the next round | The host, with a button | Host: `Button` "Siguiente ronda". Players: `hint="Lucía pasará a la siguiente ronda"` | Patterns/06 · NextRound |
|  | Automatically after a few seconds | `Countdown variant="bar" label="Siguiente ronda en"` | Patterns/06 · NextRound, Patterns/09 |

## The impostor's estimate on the Reveal screen

**Warning:** the "shown apart" and "hidden" variants give the impostor away before the vote. The reveal comes first, so an estimate drawn dashed under "Fuera de concurso", or one missing from the ruler, tells everyone who the impostor is. Only "shown like the rest" is safe before the verdict; the other two only fit a screen shown after the vote.

## The impostor does not vote

Not a decision: the rule is fixed (README, "Game rules"). The impostor's vote would always go to an innocent, one more vote to escape. Their phone shows `EmptyState icon="mask" title="Esta vez no votas"` (Patterns/07 · ImpostorCannotVote), and the voting ends when every other player has voted or the deadline passes. **Never show who has not voted yet**, nor a count like "3 de 4 han votado": the one left is always the impostor.

## Which steps move every phone at once

Only a change of state in some service can move every phone at the same time. From the reveal to the vote and from the scoreboard to the next round, the game changes state, so every phone follows. From the verdict to the scoreboard nothing changes: the scoreboard is already there to be read. That step is local navigation: each player taps "Ver clasificación" on their own phone, and nobody waits for the host (Patterns/08).
