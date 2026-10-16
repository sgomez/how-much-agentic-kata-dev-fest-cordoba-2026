import { ScenePlaceholder } from "../../shell/scene-placeholder.tsx";
import type { RoundSceneProps } from "../../shell/scene.ts";

/**
 * Patterns/05 After sending. The scene director of the games group mounts it with these props
 * (shell/scene.ts): replace the placeholder, keep the props.
 */
export const AfterSendingScreen = (props: RoundSceneProps) => (
  <ScenePlaceholder {...props} title="Respuesta enviada" group="rounds" />
);
