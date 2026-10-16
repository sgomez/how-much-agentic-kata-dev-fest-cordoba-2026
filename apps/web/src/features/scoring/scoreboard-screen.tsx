import { ScenePlaceholder } from "../../shell/scene-placeholder.tsx";
import type { RoundSceneProps } from "../../shell/scene.ts";

/**
 * Patterns/09 Scoreboard. The scene director of the games group mounts it with these props
 * (shell/scene.ts): replace the placeholder, keep the props.
 */
export const ScoreboardScreen = (props: RoundSceneProps) => (
  <ScenePlaceholder {...props} title="Clasificación" group="scoring" />
);
