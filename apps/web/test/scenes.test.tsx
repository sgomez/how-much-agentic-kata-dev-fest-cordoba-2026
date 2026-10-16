import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SCENES, SceneScreen } from "../src/features/games/scene-screens.tsx";
import type { Scene } from "../src/features/games/scene-screens.tsx";

describe("scene screens", () => {
  it.each(Object.keys(SCENES) as Scene[])(
    "%s renders with the director's props",
    (scene) => {
      const html = renderToStaticMarkup(
        <SceneScreen scene={scene} code="KQZT" round={2} />
      );

      expect(html).toContain("KQZT");
    }
  );
});
