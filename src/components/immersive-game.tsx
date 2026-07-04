import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { Link } from "react-router";
import type { CSSProperties, ReactElement } from "react";

import { firstLevel, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "../constants";
import {
  useGameAudio,
  useGameSimulation,
  useGameSimulationState,
  useKeyboardInput,
  useScoreSubmission,
  useViewportScale,
} from "../hooks";
import { difficultyAtom, rendererKindAtom } from "../stores";
import { GameStage } from "./game-stage";
import { TouchControls } from "./touch-controls";

export function ImmersiveGame(): ReactElement {
  const difficulty = useAtomValue(difficultyAtom);
  const rendererKind = useAtomValue(rendererKindAtom);
  const keyboard = useKeyboardInput();
  const simulation = useGameSimulation(
    firstLevel,
    difficulty,
    keyboard.inputRef,
  );
  useGameAudio(simulation);
  useScoreSubmission(simulation);

  const gameState = useGameSimulationState(simulation);

  const restartGame = useCallback((): void => {
    keyboard.reset();
    simulation.restart();
  }, [keyboard, simulation]);

  const scale = useViewportScale();
  const stageWrapperStyle: CSSProperties = {
    height: `${VIEWPORT_HEIGHT}px`,
    transform: `translate(-50%, -50%) scale(${scale})`,
    width: `${VIEWPORT_WIDTH}px`,
  };

  return (
    <div className="fixed inset-0 z-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-slate-950">
      <div
        className="absolute top-1/2 left-1/2 origin-center"
        style={stageWrapperStyle}
      >
        <GameStage
          input={keyboard}
          onRestart={restartGame}
          rendererKind={rendererKind}
          simulation={simulation}
        />
      </div>
      <TouchControls
        inputRef={keyboard.inputRef}
        onRestart={restartGame}
        visible={gameState.phase === "running"}
      />
      <Link
        aria-label="Exit fullscreen game and return home"
        className="fixed top-4 right-4 z-30 rounded-full border-4 border-slate-950 bg-rose-300 px-4 py-2 text-xs font-black tracking-[0.2em] text-slate-950 uppercase shadow-[5px_5px_0_rgb(15_23_42)] hover:bg-rose-200 focus-visible:ring-4 focus-visible:ring-amber-200 focus-visible:outline-none"
        to="/"
      >
        Exit fullscreen
      </Link>
    </div>
  );
}
