import clsx from "clsx";
import type { CSSProperties, ReactElement } from "react";

import { RUN_ANIMATION_FRAME_MS } from "../constants";
import type { GamePhase, Player, PlayerAnimation, Rect } from "../types";

interface PlayerSpriteProps {
  player: Player;
  elapsedMs: number;
  phase: GamePhase;
}

export function PlayerSprite({
  player,
  elapsedMs,
  phase,
}: PlayerSpriteProps): ReactElement {
  const animation = getPlayerAnimation(player, elapsedMs, phase);

  return (
    <div
      className="absolute origin-center transition-transform duration-75"
      style={getPlayerStyle(player)}
    >
      <div
        className={clsx(
          "h-full w-full rounded-lg border-4 border-slate-950 bg-red-500 shadow-[4px_4px_0_rgb(15_23_42)] transition-transform",
          getBodyClass(animation),
        )}
      >
        <div
          className={clsx(
            "mx-auto mt-1 h-3 w-6 rounded-t-full bg-rose-800 transition-transform",
            getHatClass(animation),
          )}
        />
        <div className="mx-auto mt-1 h-3 w-5 rounded-full bg-amber-100" />
        <div className="mx-auto mt-1 h-3 w-8 rounded-sm bg-blue-700" />
      </div>
    </div>
  );
}

function getPlayerAnimation(
  player: Player,
  elapsedMs: number,
  phase: GamePhase,
): PlayerAnimation {
  if (phase === "won") {
    return "celebrate";
  }
  if (phase === "lost") {
    return "hurt";
  }
  if (!player.grounded) {
    return player.velocity.y < 0 ? "jump" : "fall";
  }
  if (Math.abs(player.velocity.x) < 1) {
    return "idle";
  }
  return Math.floor(elapsedMs / RUN_ANIMATION_FRAME_MS) % 2 === 0
    ? "run-one"
    : "run-two";
}

function getPlayerStyle(player: Player): CSSProperties {
  return {
    ...getRectStyle(player),
    transform: player.facing === -1 ? "scaleX(-1)" : "scaleX(1)",
  };
}

function getRectStyle(rect: Rect): CSSProperties {
  return {
    height: `${rect.height}px`,
    left: `${rect.x}px`,
    top: `${rect.y}px`,
    width: `${rect.width}px`,
  };
}

function getBodyClass(animation: PlayerAnimation): string {
  switch (animation) {
    case "celebrate":
      return "-translate-y-2 rotate-6";
    case "hurt":
      return "rotate-12 bg-slate-500";
    case "jump":
      return "-translate-y-1";
    case "fall":
      return "translate-y-1";
    case "run-one":
      return "-rotate-3";
    case "run-two":
      return "rotate-3";
    case "idle":
      return "translate-y-0";
  }
}

function getHatClass(animation: PlayerAnimation): string {
  return animation === "celebrate" ? "-translate-y-1" : "translate-y-0";
}
