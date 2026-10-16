# VoteOption

A player tile to vote for the impostor.

## Props

```ts
export interface VoteOptionProps {
  player: { id: string; name: string };
  /** This is the player's current pick. */
  selected?: boolean;
  /** The vote has been sent: the corner icon turns into a lock (locked) or a check (changeable). */
  voted?: boolean;
  /** The vote is final: tiles stop responding. */
  locked?: boolean;
  /** Not votable (yourself when self-votes are forbidden). Pass a reason in note. */
  disabled?: boolean;
  /** The player using this phone: a "Tú" badge in the corner. */
  you?: boolean;
  /** Small line under the name: "8.500 m", "3 votos". */
  note?: string;
  onSelect?: () => void;
}
```

## States

not selected · selected · voted (changeable) · voted (final, locked) · disabled (yourself, when forbidden) · pressed · focus

## Guidelines

- Use in Grid cols={2}.
- locked makes every tile inert after a final vote; without it, tapping another tile changes the vote.

## Example

```tsx
<VoteOption
  player={p}
  selected={pick === p.id}
  voted={sent && pick === p.id}
  locked={votesAreFinal && sent}
  disabled={p.id === me.id}
  you={p.id === me.id}
  note={estimateOf(p.id)}
  onSelect={() => setPick(p.id)}
/>
```
