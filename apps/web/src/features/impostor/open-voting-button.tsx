import { Button } from "@hmk/ui";

/**
 * The host's "Abrir votación". With the voting still pending, the scene director shows
 * scoring's Reveal and passes this button as its `hostAction`. Replace the stub, keep the props.
 */
export const OpenVotingButton = (_props: { code: string; round: number }) => (
  <Button size="lg" fullWidth disabled>
    Abrir votación
  </Button>
);
