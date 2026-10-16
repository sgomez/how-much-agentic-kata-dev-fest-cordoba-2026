import { ScenePlaceholder } from "../../shell/scene-placeholder.tsx";
import type { RoundSceneProps } from "../../shell/scene.ts";

/**
 * Patterns/04 Round. The scene director of the games group mounts it with these props
 * (shell/scene.ts): replace the placeholder, keep the props.
 */
export const RoundScreen = (props: RoundSceneProps) => (
  <ScenePlaceholder {...props} title="Ronda" group="rounds" />
);
