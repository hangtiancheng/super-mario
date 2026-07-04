export { getAudioEvent, getToneProfiles } from "./audio-events";
export type { GameAudioEvent, ToneProfile } from "./audio-events";
export { getTargetCameraX, smoothCameraX } from "./camera";
export {
  couldCollideHorizontally,
  getCollisionCandidates,
} from "./collision-candidates";
export { resolveEnemyContacts } from "./enemy-contact";
export { updateEnemies } from "./enemy-motion";
export { createSegmentEnemy } from "./enemy-variation";
export { exhaustiveCheck } from "./exhaustive-check";
export {
  allCoinsCollected,
  collectCoins,
  createCoins,
  createPlayer,
} from "./game-entities";
export {
  getProgressMessage,
  hasMovementInput,
  loseLife,
  removeBumpedPlatform,
  startGame,
} from "./game-flow";
export { createIdleInput, setGameInputControl } from "./game-input";
export { extendInfiniteWorld } from "./infinite-map";
export { carryPlayerByPlatforms, updatePlatforms } from "./platform-motion";
export type { PlatformDelta, PlatformDeltaMap } from "./platform-motion";
export {
  createSpawns,
  getPlatformCenter,
  spawnParticles,
  updateParticles,
} from "./particles";
export { clamp, intersects } from "./rect";
export { getDistanceScore, getRunDistance, getWeightedScore } from "./score";
export type { ScoreBreakdown, ScoreInput } from "./score";
export { safelyUpdateGameState } from "./safe-game-update";
export {
  buildPlatformIndex,
  getPlatformsInRange,
  lowerBoundByX,
} from "./spatial-index";
export type { PlatformIndex } from "./spatial-index";
export {
  filterVisibleRects,
  getViewportBounds,
  isRectVisible,
} from "./viewport";
export { updateGameState } from "./game-state";
export { createInitialGameState } from "./initial-game-state";
export { updatePlayer } from "./player-motion";
export type { GameInputControl } from "./game-input";
export type { ParticleResult, ParticleSpawn } from "./particles";
export type { ViewportBounds } from "./viewport";
