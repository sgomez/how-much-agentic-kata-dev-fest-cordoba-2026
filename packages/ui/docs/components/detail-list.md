# DetailList

Read-only label and value rows: the game's settings in the lobby.

## Props

```ts
export interface DetailListProps {
  items: DetailItem[];
  /** Optional caption above ("Ajustes de la partida"). */
  title?: string;
}
```

## States

default · with icons

## Example

```tsx
<DetailList
  title="Ajustes"
  items={[{ label: "Rondas", value: "10", icon: "flag" }]}
/>
```
