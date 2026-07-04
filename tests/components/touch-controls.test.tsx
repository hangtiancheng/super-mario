import { render, screen } from "@testing-library/react";
import { useRef } from "react";
import type { ReactElement, RefObject } from "react";
import { describe, expect, it } from "vitest";

import { TouchControls } from "../../src/components/touch-controls";
import type { GameInput } from "../../src/types";

function Host({ onRestart }: { onRestart: () => void }): ReactElement {
  const inputRef = useRef<GameInput>({
    jump: false,
    left: false,
    restart: false,
    right: false,
  });
  return (
    <TouchControls
      inputRef={inputRef as RefObject<GameInput>}
      onRestart={onRestart}
    />
  );
}

describe("TouchControls", (): void => {
  it("renders directional, restart, and jump buttons", (): void => {
    render(<Host onRestart={(): void => undefined} />);
    expect(screen.getByRole("button", { name: "Left" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Right" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Jump" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /restart run/i }),
    ).toBeInTheDocument();
  });
});
