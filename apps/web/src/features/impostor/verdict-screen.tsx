import { ScenePlaceholder } from "../../shell/scene-placeholder.tsx";
import type { RoundSceneProps } from "../../shell/scene.ts";

/**
 * Patterns/08 Verdict. The scene director of the games group mounts it with these props
 * (shell/scene.ts): replace the placeholder, keep the props.
 */
export const VerdictScreen = (props: RoundSceneProps) => (
  <ScenePlaceholder {...props} title="Veredicto" group="impostor" />
);
