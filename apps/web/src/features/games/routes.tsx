import type { RouteObject } from "react-router";

import { HomeScreen } from "./home-screen.tsx";
import { ScenePreviewPage } from "./scene-screens.tsx";

/**
 * Screens of the games group. Add your routes here; the shell mounts them behind
 * the nickname sign-in. Build screens only with @hmk/ui (see packages/ui/COMPONENTS.md;
 * the Patterns/ stories in `pnpm storybook` show each screen put together),
 * fetch views with `useView` and send actions with `api` from src/shell.
 * `/` is where every player lands after the nickname: create or join a game.
 * The scene director goes at `/games/:code` and renders `SceneScreen` (scene-screens.tsx).
 */
export const routes: RouteObject[] = [
  { path: "/", element: <HomeScreen /> },
  // Ready-made, for every group: keep it.
  {
    path: "/games/:code/preview/:scene/:round",
    element: <ScenePreviewPage />,
  },
];
