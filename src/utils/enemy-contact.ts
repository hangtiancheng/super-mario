import { STOMP_BOUNCE_VELOCITY, STOMP_TOLERANCE } from "../constants";
import type { Enemy, Player, Vector } from "../types";
import { couldCollideHorizontally } from "./collision-candidates";
import { intersects } from "./rect";

export interface EnemyContactResult {
  enemies: Enemy[];
  player: Player;
  stompedCount: number;
  stompedAt: Vector[];
  wasHit: boolean;
}

export function resolveEnemyContacts(
  previousPlayer: Player,
  player: Player,
  enemies: Enemy[],
): EnemyContactResult {
  const remainingEnemies: Enemy[] = [];
  const stompedAt: Vector[] = [];
  let resolvedPlayer = player;
  let stompedCount = 0;
  let wasHit = false;

  for (const enemy of enemies) {
    if (!couldCollideHorizontally(resolvedPlayer, enemy, 16)) {
      remainingEnemies.push(enemy);
    } else if (!intersects(resolvedPlayer, enemy)) {
      remainingEnemies.push(enemy);
    } else if (isStomp(previousPlayer, resolvedPlayer, enemy)) {
      stompedAt.push({
        x: enemy.x + enemy.width / 2,
        y: enemy.y + enemy.height / 2,
      });
      resolvedPlayer = bounceFromStomp(resolvedPlayer, enemy.y);
      stompedCount += 1;
    } else {
      remainingEnemies.push(enemy);
      wasHit = true;
    }
  }

  return {
    enemies: remainingEnemies,
    player: resolvedPlayer,
    stompedCount,
    stompedAt,
    wasHit,
  };
}

function isStomp(
  previousPlayer: Player,
  player: Player,
  enemy: Enemy,
): boolean {
  const previousBottom = previousPlayer.y + previousPlayer.height;
  const currentBottom = player.y + player.height;
  return (
    player.velocity.y > 0 &&
    previousBottom <= enemy.y + STOMP_TOLERANCE &&
    currentBottom >= enemy.y
  );
}

function bounceFromStomp(player: Player, enemyTop: number): Player {
  return {
    ...player,
    y: enemyTop - player.height,
    velocity: { ...player.velocity, y: -STOMP_BOUNCE_VELOCITY },
    grounded: false,
    coyoteMs: 0,
    jumpBufferMs: 0,
  };
}
