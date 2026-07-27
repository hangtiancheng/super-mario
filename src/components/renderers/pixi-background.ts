import { Container, Graphics } from "pixi.js";

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/constants";

const CLOUD_COUNT = 5;
const HILL_COUNT = 4;
const CLOUD_SPEED = 0.2;
const HILL_SPEED = 0.45;
const PARALLAX_PADDING = 320;
const CLOUD_WRAP_THRESHOLD = -220;

interface ParallaxLayer {
  baseX: number;
  graphic: Graphics;
}

export interface PixiBackgroundState {
  cloudLayers: ParallaxLayer[];
  container: Container;
  hillLayers: ParallaxLayer[];
  worldWidth: number;
}

export function createPixiBackground(): PixiBackgroundState {
  const container = new Container();
  container.addChild(buildSky());
  container.addChild(buildSandStrip());
  const cloudLayers: ParallaxLayer[] = [];
  for (let index = 0; index < CLOUD_COUNT; index += 1) {
    const graphic = buildCloud(50 + (index % 2) * 38);
    container.addChild(graphic);
    cloudLayers.push({ baseX: index * 520 + 90, graphic });
  }
  const hillLayers: ParallaxLayer[] = [];
  for (let index = 0; index < HILL_COUNT; index += 1) {
    const graphic = buildHill();
    container.addChild(graphic);
    hillLayers.push({ baseX: index * 580 + 120, graphic });
  }
  return { cloudLayers, container, hillLayers, worldWidth: 0 };
}

export function syncPixiBackground(
  state: PixiBackgroundState,
  cameraX: number,
  worldWidth: number,
  reducedMotion: boolean,
): void {
  state.worldWidth = worldWidth;
  for (const layer of state.cloudLayers) {
    layer.graphic.x = getParallaxX(
      layer.baseX,
      cameraX,
      CLOUD_SPEED,
      worldWidth,
      reducedMotion,
    );
  }
  for (const layer of state.hillLayers) {
    layer.graphic.x = getParallaxX(
      layer.baseX,
      cameraX,
      HILL_SPEED,
      worldWidth,
      reducedMotion,
    );
  }
}

export function destroyPixiBackground(state: PixiBackgroundState): void {
  state.container.removeChildren().forEach((child): void => {
    child.destroy({ children: true });
  });
  state.cloudLayers.length = 0;
  state.hillLayers.length = 0;
}

function buildSky(): Graphics {
  return new Graphics()
    .rect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT)
    .fill({ color: 0x7dd3fc });
}

function buildSandStrip(): Graphics {
  return new Graphics()
    .rect(0, 360, VIEWPORT_WIDTH, 180)
    .fill({ alpha: 0.9, color: 0xfef3c7 });
}

function buildCloud(y: number): Graphics {
  const graphic = new Graphics()
    .roundRect(0, 0, 150, 42, 22)
    .fill({ color: 0xffffff });
  graphic.y = y;
  return graphic;
}

function buildHill(): Graphics {
  const graphic = new Graphics()
    .roundRect(0, 0, 300, 160, 80)
    .fill({ color: 0x22c55e });
  graphic.y = 380;
  return graphic;
}

function getParallaxX(
  baseX: number,
  cameraX: number,
  speed: number,
  worldWidth: number,
  reducedMotion: boolean,
): number {
  const offsetX = reducedMotion ? 0 : cameraX * speed;
  const wrapped = (baseX - offsetX) % (worldWidth + PARALLAX_PADDING);
  if (wrapped < CLOUD_WRAP_THRESHOLD) {
    return wrapped + worldWidth + PARALLAX_PADDING;
  }
  return wrapped;
}
