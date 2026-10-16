import type { ComponentType } from "react";
import { useParams } from "react-router";

import type { RoundSceneProps } from "../../shell/scene.ts";
import {
  OpenVotingButton,
  VerdictScreen,
  VotingScreen,
} from "../impostor/index.ts";
import { AfterSendingScreen, RoundScreen } from "../rounds/index.ts";
import {
  FinalRankingScreen,
  RevealScreen,
  ScoreboardScreen,
} from "../scoring/index.ts";
import { LobbyScreen } from "./lobby-screen.tsx";

/**
 * Every in-game screen, already wired: each group fills in its own and it shows up here.
 * The scene director (yours to build, at `/games/:code`) picks one from the game's state
 * and renders `<SceneScreen scene={…} code={…} round={…} />`. If a screen's props stop
 * matching shell/scene.ts, this file stops compiling.
 */
export const SCENES = {
  lobby: LobbyScreen,
  round: RoundScreen,
  "after-sending": AfterSendingScreen,
  reveal: RevealScreen,
  voting: VotingScreen,
  verdict: VerdictScreen,
  scoreboard: ScoreboardScreen,
  "final-ranking": FinalRankingScreen,
} satisfies Record<string, ComponentType<RoundSceneProps>>;

export type Scene = keyof typeof SCENES;

/** Host buttons other groups export for the director's `hostAction` slot. */
export const HOST_ACTIONS = {
  "open-voting": OpenVotingButton,
} satisfies Record<string, ComponentType<{ code: string; round: number }>>;

const isScene = (name: string | undefined): name is Scene =>
  name !== undefined && Object.hasOwn(SCENES, name);

export const SceneScreen = ({
  scene,
  ...props
}: RoundSceneProps & { scene: Scene }) => {
  const Component: ComponentType<RoundSceneProps> = SCENES[scene];
  return <Component {...props} />;
};

/**
 * `/games/:code/preview/:scene/:round`: one screen with real data and no director,
 * so each group can work on its screens before the director exists.
 */
export const ScenePreviewPage = () => {
  const { code = "", scene, round } = useParams();
  if (!isScene(scene)) {
    return null;
  }
  return <SceneScreen scene={scene} code={code} round={Number(round ?? 1)} />;
};
