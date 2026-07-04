import type { Graphics } from "pixi.js";

import type { Coin, Enemy, GameState, Particle, Platform } from "../../types";
import {
  getEnemyColor,
  getParticleColor,
  getToneColor,
} from "./pixi-primitives";

export function drawPlatform(graphic: Graphics, platform: Platform): void {
  graphic
    .clear()
    .rect(0, 0, platform.width, platform.height)
    .fill({ color: getToneColor(platform.tone) })
    .stroke({ color: 0x0f172a, width: 4 });
  graphic.position.set(platform.x, platform.y);
}

export function drawCoin(graphic: Graphics, coin: Coin): void {
  graphic
    .clear()
    .circle(coin.width / 2, coin.height / 2, coin.width / 2)
    .fill({ color: 0xfacc15 });
  graphic.position.set(coin.x, coin.y);
}

export function drawEnemy(graphic: Graphics, enemy: Enemy): void {
  graphic
    .clear()
    .roundRect(
      0,
      0,
      enemy.width,
      enemy.height,
      enemy.type === "flyer" ? 16 : 10,
    )
    .fill({ color: getEnemyColor(enemy.type) })
    .stroke({ color: 0x0f172a, width: 4 })
    .circle(enemy.width / 2, 11, 4)
    .fill({ color: 0xffffff });
  graphic.position.set(enemy.x, enemy.y);
}

export function drawParticle(graphic: Graphics, particle: Particle): void {
  graphic
    .clear()
    .circle(particle.width / 2, particle.height / 2, particle.width / 2)
    .fill({
      alpha: particle.lifeMs / particle.maxLifeMs,
      color: getParticleColor(particle.kind),
    });
  graphic.position.set(particle.x, particle.y);
}

export function drawPlayer(graphic: Graphics, state: GameState): void {
  const player = state.player;
  graphic
    .clear()
    .roundRect(0, 0, player.width, player.height, 8)
    .fill({ color: state.phase === "lost" ? 0x64748b : 0xef4444 })
    .stroke({ color: 0x0f172a, width: 4 })
    .roundRect(6, 4, 22, 10, 5)
    .fill({ color: 0x991b1b })
    .roundRect(7, 17, 20, 11, 6)
    .fill({ color: 0xfef3c7 })
    .rect(4, 31, 26, 12)
    .fill({ color: 0x1d4ed8 })
    .stroke({ color: 0x0f172a, width: 4 });
  graphic.position.set(player.x, player.y);
}

export function getEntityId(entity: { id: string }): string {
  return entity.id;
}

export function getParticleId(particle: Particle): string {
  return particle.id.toString();
}

export function getPlayerKey(): string {
  return "player";
}

export function isVisibleCoin(coin: Coin): boolean {
  return !coin.collected;
}
