import { describe, expect, it } from "vitest";

import type { GameInput, GameState, LevelData } from "../../src/types";
import { createInitialGameState, updateGameState } from "../../src/utils";

const idleInput: GameInput = {
  jump: false,
  left: false,
  restart: false,
  right: false,
};

const baseLevel: LevelData = {
  coins: [],
  enemies: [],
  goal: { height: 90, id: "goal", width: 54, x: 900, y: 410 },
  height: 540,
  id: "score-demo",
  name: "Score Demo",
  platforms: [
    {
      height: 40,
      id: "ground",
      tone: "ground",
      width: 1_000,
      x: 0,
      y: 500,
    },
  ],
  spawn: { x: 100, y: 452 },
  summary: "Score demo",
  width: 1_000,
};

function createRunningState(level: LevelData): GameState {
  return {
    ...createInitialGameState(level, "low"),
    phase: "running",
  };
}

describe("updateGameState scoring", (): void => {
  it("adds collected coins to weighted score", (): void => {
    const level: LevelData = {
      ...baseLevel,
      coins: [{ height: 22, id: "coin", width: 22, x: 100, y: 452 }],
    };
    const nextState = updateGameState(createRunningState(level), idleInput, 0);
    expect(nextState.stats.coinsCollected).toBe(1);
    expect(nextState.stats.score).toBe(100);
  });

  it("adds stomped enemies to weighted score", (): void => {
    const level: LevelData = {
      ...baseLevel,
      enemies: [
        {
          direction: 1,
          height: 32,
          id: "walker",
          originX: 100,
          patrolDistance: 120,
          speed: 80,
          type: "walker",
          width: 34,
          x: 100,
          y: 468,
        },
      ],
    };
    const state = {
      ...createRunningState(level),
      player: {
        ...createRunningState(level).player,
        grounded: false,
        velocity: { x: 0, y: 100 },
        y: 421,
      },
    };
    const nextState = updateGameState(state, idleInput, 0);
    expect(nextState.stats.stompedEnemies).toBe(1);
    expect(nextState.stats.score).toBe(250);
  });

  it("adds bumped breakable platforms to weighted score", (): void => {
    const level: LevelData = {
      ...baseLevel,
      platforms: [
        ...baseLevel.platforms,
        {
          height: 16,
          id: "mario",
          tone: "breakable",
          width: 64,
          x: 90,
          y: 420,
        },
      ],
    };
    const state = {
      ...createRunningState(level),
      player: {
        ...createRunningState(level).player,
        grounded: false,
        jumpHeld: true,
        velocity: { x: 0, y: -100 },
        y: 435,
      },
    };
    const nextState = updateGameState(state, idleInput, 16);
    expect(nextState.stats.marioBroken).toBe(1);
    expect(nextState.stats.score).toBe(50);
  });
});
