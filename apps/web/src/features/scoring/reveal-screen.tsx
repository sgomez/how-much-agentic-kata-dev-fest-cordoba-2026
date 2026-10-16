import { ScenePlaceholder } from "../../shell/scene-placeholder.tsx";
import type { RoundSceneProps } from "../../shell/scene.ts";

/**
 * Patterns/06 Reveal. The scene director of the games group mounts it with these props
 * (shell/scene.ts): replace the placeholder, keep the props.
 */
export const RevealScreen = (props: RoundSceneProps) => (
  <ScenePlaceholder {...props} title="Resultado de la ronda" group="scoring" />
);
