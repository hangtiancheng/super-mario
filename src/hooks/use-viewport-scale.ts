import { useSyncExternalStore } from "react";

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "../constants";

const FALLBACK_SCALE = 1;

function subscribe(callback: () => void): () => void {
  window.addEventListener("resize", callback);
  window.addEventListener("orientationchange", callback);
  return (): void => {
    window.removeEventListener("resize", callback);
    window.removeEventListener("orientationchange", callback);
  };
}

function getSnapshot(): number {
  const widthScale = window.innerWidth / VIEWPORT_WIDTH;
  const heightScale = window.innerHeight / VIEWPORT_HEIGHT;
  const scale = Math.min(widthScale, heightScale);
  return Number.isFinite(scale) && scale > 0 ? scale : FALLBACK_SCALE;
}

function getServerSnapshot(): number {
  return FALLBACK_SCALE;
}

export function useViewportScale(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
