import { ScenePlaceholder } from "../../shell/scene-placeholder.tsx";
import type { SceneProps } from "../../shell/scene.ts";

/**
 * Patterns/03 Lobby. The scene director of the games group mounts it with these props
 * (shell/scene.ts): replace the placeholder, keep the props.
 */
export const LobbyScreen = (props: SceneProps) => (
  <ScenePlaceholder {...props} title="Sala de espera" group="games" />
);
