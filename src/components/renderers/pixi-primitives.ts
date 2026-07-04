import { Graphics } from "pixi.js";

import type { Rect } from "../../types";

export function createRect(
  rect: Rect,
  color: number,
  alpha: number = 1,
): Graphics {
  return new Graphics()
    .rect(rect.x, rect.y, rect.width, rect.height)
    .fill({ alpha, color });
}

export function createBorderedRect(
  rect: Rect,
  color: number,
  borderColor: number = 0x0f172a,
): Graphics {
  return new Graphics()
    .rect(rect.x, rect.y, rect.width, rect.height)
    .fill({ color })
    .stroke({ color: borderColor, width: 4 });
}

export function createRoundRect(
  rect: Rect,
  radius: number,
  color: number,
  borderColor: number = 0x0f172a,
): Graphics {
  return new Graphics()
    .roundRect(rect.x, rect.y, rect.width, rect.height, radius)
    .fill({ color })
    .stroke({ color: borderColor, width: 4 });
}

export function createCircle(
  x: number,
  y: number,
  radius: number,
  color: number,
  alpha: number = 1,
): Graphics {
  return new Graphics().circle(x, y, radius).fill({ alpha, color });
}

export function getToneColor(tone: string): number {
  switch (tone) {
    case "breakable":
      return 0xf59e0b;
    case "mario":
      return 0xea580c;
    case "grass":
      return 0x84cc16;
    case "ground":
      return 0x57534e;
    default:
      return 0x94a3b8;
  }
}

export function getEnemyColor(type: string): number {
  switch (type) {
    case "flyer":
      return 0x0ea5e9;
    case "hopper":
      return 0x84cc16;
    case "walker":
      return 0xc026d3;
    default:
      return 0xec4899;
  }
}

export function getParticleColor(kind: string): number {
  switch (kind) {
    case "mario":
      return 0xea580c;
    case "coin":
      return 0xfacc15;
    case "goal":
      return 0x6ee7b7;
    case "hit":
      return 0xef4444;
    case "stomp":
      return 0xf0abfc;
    default:
      return 0xffffff;
  }
}
