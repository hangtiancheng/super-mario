import { describe, expect, it } from "vitest";

import { firstLevel } from "../../src/constants";
import { createInitialGameState, getAudioEvent } from "../../src/utils";

describe("getAudioEvent", (): void => {
  it("uses stomped enemy stats for stomp audio", (): void => {
    const previous = createInitialGameState(firstLevel, "medium");
    const current = {
      ...previous,
      stats: { ...previous.stats, stompedEnemies: 1 },
    };
    expect(getAudioEvent(previous, current)).toBe("stomp");
  });

  it("uses broken mario stats for break audio", (): void => {
    const previous = createInitialGameState(firstLevel, "medium");
    const current = {
      ...previous,
      stats: { ...previous.stats, marioBroken: 1 },
    };
    expect(getAudioEvent(previous, current)).toBe("break");
  });
});
