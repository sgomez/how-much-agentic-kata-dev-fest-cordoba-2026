import { ScenePlaceholder } from "../../shell/scene-placeholder.tsx";
import type { SceneProps } from "../../shell/scene.ts";

/**
 * Patterns/10 Final ranking. The scene director of the games group mounts it with these props
 * (shell/scene.ts): replace the placeholder, keep the props.
 */
export const FinalRankingScreen = (props: SceneProps) => (
  <ScenePlaceholder {...props} title="Clasificación final" group="scoring" />
);
