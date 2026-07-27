import { Howl } from "howler";

import bgmUrl from "@/assets/bgm.mp3";

let bgm: Howl | null = null;

export function playBgm(): void {
  bgm ??= new Howl({
    src: [bgmUrl],
    loop: true,
    volume: 0.35,
    html5: true,
  });
  if (!bgm.playing()) {
    bgm.play();
  }
}
