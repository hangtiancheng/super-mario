import { Link } from "react-router";
import type { ReactElement } from "react";

import { useFullscreen } from "@/hooks";

interface FullscreenControlsProps {
  routeMode: "fullscreen" | "home";
}

export function FullscreenControls({
  routeMode,
}: FullscreenControlsProps): ReactElement {
  const fullscreen = useFullscreen();
  const routeTarget = routeMode === "fullscreen" ? "/fullscreen" : "/";
  const routeLabel =
    routeMode === "fullscreen" ? "Open fullscreen" : "Back to home";

  return (
    <div className="flex flex-wrap gap-3">
      <button
        className="rounded-full border-4 border-slate-950 bg-cyan-300 px-5 py-2 text-xs font-black tracking-[0.2em] text-slate-950 uppercase shadow-[5px_5px_0_rgb(15_23_42)] disabled:opacity-50"
        disabled={!fullscreen.supported}
        onClick={fullscreen.toggleFullscreen}
        type="button"
      >
        {fullscreen.active ? "Exit browser fullscreen" : "Browser fullscreen"}
      </button>
      <Link
        className="rounded-full border-4 border-slate-950 bg-white px-5 py-2 text-xs font-black tracking-[0.2em] text-slate-950 uppercase shadow-[5px_5px_0_rgb(15_23_42)]"
        to={routeTarget}
      >
        {routeLabel}
      </Link>
    </div>
  );
}
