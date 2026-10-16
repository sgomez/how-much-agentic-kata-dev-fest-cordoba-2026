# Games

The gathering of players behind a code. It knows who is in each game, who hosts it and which phase it is in, and it moves the game from the lobby through its rounds to the end.

## Language

### People

**Player**: Someone taking part in one game, known to the others by their nickname. Signing in alone does not make anyone a player. _Avoid_: User, participant

**Host**: The player who created the game. The host plays like everyone else and also starts the game. _Avoid_: Owner, admin, master

**Nickname**: The name the other players see. Unique within a game: a second player cannot join with a nickname already in it. _Avoid_: Name, alias, username

### Playing together

**Game**: Players gathered behind a code to play a series of rounds ("partida" on screen). Playing again with the same people is a new game. _Avoid_: Match, room, session

**Code**: What players type to join a game. Games makes it up, and it is unique only among the games still being played. _Avoid_: PIN, room code

**Settings**: What the host picks when creating a game: number of rounds, seconds per round, impostor mode and packs. They are part of the game and never change once it exists. _Avoid_: Config, options

### Phases

**Lobby**: The phase of a game before the host starts it, while players join. It is a moment of a game, not a place of its own. _Avoid_: Waiting room

**Started**: The phase of a game from the moment the host starts it until it finishes. _Avoid_: Running, in progress

**Finished**: The phase of a game once its last round is over, or once its deck is exhausted and no further round can be played. _Avoid_: Over, ended, closed

**Current round**: The round a started game is on. Games keeps track of it; where that round itself stands belongs to the round. _Avoid_: Active round

## Open questions

- **Code format**: four letters, or another length with letters and digits? (Patterns/02 · CodeFormat)
- **Game capacity**: unlimited, or a maximum number of players? (Patterns/03 · GameCapacity)
- **The host leaves**: does the game close for everyone, or does another player become host? (Patterns/03 · HostLeaves)
- **Joining after the start**: rejected, or allowed from the next round? (Patterns/04 · LateJoin)
- **Who moves to the next round**: the host with a button, or automatically after a few seconds? (Patterns/06 · NextRound)
