import { BottomActionBar, EmptyState, Screen, TopBar } from "@hmk/ui";

import type { SceneProps } from "./scene.ts";

/** An in-game screen a group has not built yet. Each stub renders one until its group replaces it. */
export const ScenePlaceholder = ({
  title,
  group,
  code,
  round,
  hostAction,
  banner,
  overlays,
}: SceneProps & { round?: number; title: string; group: string }) => (
  <Screen
    centered
    top={<TopBar gameCode={code} round={round} />}
    bottom={
      hostAction === undefined ? undefined : (
        <BottomActionBar>{hostAction}</BottomActionBar>
      )
    }
    banner={banner}
    overlays={overlays}
  >
    <EmptyState
      icon="ruler"
      title={title}
      description={`Esta pantalla la construye el grupo «${group}».`}
    />
  </Screen>
);
