import type { Difficulty } from "../schema";
import type { GameStats } from "./stats";

export type GamePhase = "ready" | "running" | "won" | "lost";

export type HorizontalDirection = -1 | 1;

export type PlatformTone = "breakable" | "mario" | "grass" | "ground";

export type PlatformMotionAxis = "x" | "y";

export type PlayerAnimation =
  | "celebrate"
  | "fall"
  | "hurt"
  | "idle"
  | "jump"
  | "run-one"
  | "run-two";

export type EnemyType = "flyer" | "hopper" | "walker";

export type ParticleKind = "mario" | "coin" | "goal" | "hit" | "stomp";

export interface Vector {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export type Rect = Vector & Size;

export interface Player extends Rect {
  velocity: Vector;
  grounded: boolean;
  facing: HorizontalDirection;
  coyoteMs: number;
  jumpBufferMs: number;
  jumpHeld: boolean;
}

export interface Platform extends Rect {
  id: string;
  tone: PlatformTone;
  motion?: PlatformMotion | undefined;
}

export interface PlatformMotion {
  axis: PlatformMotionAxis;
  origin: number;
  distance: number;
  speed: number;
  direction: HorizontalDirection;
}

export interface LevelCoin extends Rect {
  id: string;
}

export interface Coin extends LevelCoin {
  collected: boolean;
}

export interface BaseEnemy extends Rect {
  id: string;
  originX: number;
  patrolDistance: number;
  speed: number;
  direction: HorizontalDirection;
}

export interface WalkerEnemy extends BaseEnemy {
  type: "walker";
}

export interface HopperEnemy extends BaseEnemy {
  type: "hopper";
  originY: number;
  hopPhaseMs: number;
  hopHeight: number;
}

export interface FlyerEnemy extends BaseEnemy {
  type: "flyer";
  originY: number;
  wavePhaseMs: number;
  waveHeight: number;
}

export type Enemy = FlyerEnemy | HopperEnemy | WalkerEnemy;

export interface Particle extends Rect {
  id: number;
  kind: ParticleKind;
  velocity: Vector;
  lifeMs: number;
  maxLifeMs: number;
}

export interface Goal extends Rect {
  id: string;
}

export interface LevelData {
  id: string;
  name: string;
  summary: string;
  width: number;
  height: number;
  spawn: Vector;
  platforms: Platform[];
  coins: LevelCoin[];
  enemies: Enemy[];
  goal: Goal;
}

export interface GameInput {
  left: boolean;
  right: boolean;
  jump: boolean;
  restart: boolean;
}

export interface GameState {
  difficulty: Difficulty;
  level: LevelData;
  phase: GamePhase;
  player: Player;
  platforms: Platform[];
  coins: Coin[];
  enemies: Enemy[];
  particles: Particle[];
  nextParticleId: number;
  nextSegmentIndex: number;
  worldWidth: number;
  cameraX: number;
  stats: GameStats;
  message: string;
}
