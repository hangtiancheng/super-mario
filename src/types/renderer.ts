import type { GameSimulation } from "@/hooks/use-game-simulation";
import type { GameState } from "./game";

export type GameRendererKind = "dom" | "pixi";

export interface GameRendererProps {
  reducedMotion: boolean;
  state: GameState;
}

export interface PixiGameRendererProps {
  reducedMotion: boolean;
  simulation: GameSimulation;
}
