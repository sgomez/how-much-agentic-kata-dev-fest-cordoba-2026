import type { Meta, StoryObj } from "@storybook/react-vite";

import { Frames, PhoneFrame } from "../stories/helpers.tsx";
import { VotingScreen } from "./screens.tsx";

const meta: Meta = { title: "Patterns/07 Voting", tags: ["games", "impostor"] };
export default meta;
type S = StoryObj;

/** Fixed rules: the pick can change until «Votar»; then the vote is final. Nobody votes for themselves. */
export const VoteForTheImpostor: S = {
  render: () => (
    <Frames>
      <PhoneFrame label="Eligiendo">
        <VotingScreen />
      </PhoneFrame>
      <PhoneFrame label="Voto enviado">
        <VotingScreen state="voted" />
      </PhoneFrame>
    </Frames>
  ),
};
/** Fixed rule: the impostor's vote would always go to an innocent player. */
export const ImpostorCannotVote: S = {
  render: () => (
    <Frames>
      <PhoneFrame
        label="Regla fija · el impostor no vota"
        note="Su voto siempre iría a un inocente"
      >
        <VotingScreen youAreImpostor />
      </PhoneFrame>
    </Frames>
  ),
};
