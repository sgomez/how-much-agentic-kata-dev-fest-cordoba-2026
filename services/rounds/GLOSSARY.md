# Rounds

The play of each question. It knows the question every round uses, collects each player's estimate before the deadline, decides who the impostor of a round is, and reveals the solution.

## Language

**Round**: One question that every player of a game estimates before a deadline. Rounds are numbered from 1 within their game. A round is not its question: the question comes from the catalog, and the round uses it. _Avoid_: Turn

**Estimate**: The number a player sends for a round. A player who sends nothing has no estimate; there is no empty or zero estimate. _Avoid_: Answer, guess, bet

**Deadline**: The moment a round stops taking estimates: its start plus the game's seconds per round. _Avoid_: Timeout, end time

**Estimating**: The phase of a round from its start until its reveal, while players send estimates. _Avoid_: Open, answering

**Reveal**: The moment a round shows its solution and every estimate, once the deadline has passed. A round is revealed from then on; closing and revealing are one and the same. _Avoid_: Close, end, timeout

**Impostor**: The one player of a round, drawn at random, who sees the unit but not the question. A round with an impostor is still an ordinary round. _Avoid_: Spy, traitor

### Borrowed terms

**Question**, **Solution**, **Unit**, **Ruler range**: see the [catalog glossary](../catalog/GLOSSARY.md).

**Game**, **Player**: see the [games glossary](../games/GLOSSARY.md).

## Open questions

- **Changing an estimate**: locked after sending, or editable until the deadline? (Patterns/05 · EditRule)
- **Ending early**: does a round end only at its deadline, or as soon as every player has sent an estimate? (Patterns/04 · EndsEarly)
