import { describe, expect, it } from "vitest";

import { INFINITE_SEGMENT_TRIGGER_DISTANCE } from "@/constants";
import type { Coin, Enemy, LevelData, Platform } from "@/types";
import { extendInfiniteWorld } from "@/utils/infinite-map";

const baseLevel: LevelData = {
  coins: [{ id: "c1", height: 22, width: 22, x: 100, y: 200 }],
  enemies: [
    {
      direction: 1,
      height: 32,
      id: "w1",
      originX: 200,
      patrolDistance: 100,
      speed: 80,
      type: "walker",
      width: 32,
      x: 200,
      y: 400,
    },
  ],
  goal: { id: "goal", height: 64, width: 32, x: 900, y: 400 },
  height: 540,
  id: "demo",
  name: "Demo",
  platforms: [
    {
      height: 32,
      id: "p1",
      tone: "ground",
      width: 1_000,
      x: 0,
      y: 500,
    },
  ],
  spawn: { x: 50, y: 100 },
  summary: "demo",
  width: 1_000,
};

const platforms: Platform[] = [...baseLevel.platforms];
const coins: Coin[] = baseLevel.coins.map((coin): Coin => ({
  ...coin,
  collected: false,
}));
const enemies: Enemy[] = [...baseLevel.enemies];

describe("extendInfiniteWorld", (): void => {
  it("returns the existing world when player is far from edge", (): void => {
    const result = extendInfiniteWorld(
      baseLevel,
      0,
      platforms,
      coins,
      enemies,
      baseLevel.width,
      1,
    );
    expect(result.platforms).toHaveLength(1);
    expect(result.coins).toHaveLength(1);
    expect(result.enemies).toHaveLength(1);
    expect(result.worldWidth).toBe(baseLevel.width);
    expect(result.nextSegmentIndex).toBe(1);
  });

  it("appends a new segment when player approaches the edge", (): void => {
    const triggerX = baseLevel.width - INFINITE_SEGMENT_TRIGGER_DISTANCE + 1;
    const result = extendInfiniteWorld(
      baseLevel,
      triggerX,
      platforms,
      coins,
      enemies,
      baseLevel.width,
      1,
    );
    expect(result.platforms).toHaveLength(2);
    expect(result.coins).toHaveLength(2);
    expect(result.enemies).toHaveLength(2);
    expect(result.worldWidth).toBe(baseLevel.width * 2);
    expect(result.nextSegmentIndex).toBe(2);
    expect(result.platforms[1]?.id).toBe("segment-1-p1");
    expect(result.platforms[1]?.x).toBe(baseLevel.width);
  });

  it("varies cloned enemies deterministically by segment", (): void => {
    const triggerX = baseLevel.width - INFINITE_SEGMENT_TRIGGER_DISTANCE + 1;
    const first = extendInfiniteWorld(
      baseLevel,
      triggerX,
      platforms,
      coins,
      enemies,
      baseLevel.width,
      1,
    );
    const second = extendInfiniteWorld(
      baseLevel,
      triggerX,
      platforms,
      coins,
      enemies,
      baseLevel.width,
      1,
    );
    const clonedEnemy = first.enemies[1];
    expect(second.enemies[1]).toEqual(clonedEnemy);
    expect(clonedEnemy).not.toMatchObject({
      direction: baseLevel.enemies[0]?.direction,
      speed: baseLevel.enemies[0]?.speed,
      x: baseLevel.enemies[0]?.x + baseLevel.width,
    });
  });
});
