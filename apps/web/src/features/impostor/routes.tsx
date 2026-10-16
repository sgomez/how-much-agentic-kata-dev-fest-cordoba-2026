import type { RouteObject } from "react-router";

/**
 * Your in-game screens need no route: the scene director of the games group mounts the
 * ones exported from index.ts at `/games/:code`. To work on one before the director exists,
 * open `/games/<code>/preview/<scene>/<round>` (scenes in features/games/scene-screens.tsx).
 * Add a route here only for a page outside the game.
 */
export const routes: RouteObject[] = [];
