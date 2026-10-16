import type { ReactNode } from "react";

/**
 * What the scene director (games group, `/games/:code`) passes to every in-game screen.
 * It is a contract between groups, like the HTTP ones: no feature changes it.
 * Only ids and slots travel here; each screen fetches its own data with `useView`.
 */
export interface SceneProps {
  code: string;
  /** The host's button that moves the game on, built by the director. Put it in your BottomActionBar. */
  hostAction?: ReactNode;
  /** The ConnectionBanner, built by the director. Pass it to Screen's `banner`. */
  banner?: ReactNode;
  /** Toasts and sheets from the director. Pass them to Screen's `overlays`. */
  overlays?: ReactNode;
}

/**
 * Screens tied to a round get its number (1-based) from the director. Show that round,
 * not the one your own poll says is current: the two can differ for a second.
 */
export interface RoundSceneProps extends SceneProps {
  round: number;
}
