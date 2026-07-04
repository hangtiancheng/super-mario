import { z } from "zod";

export const gameRendererKindSchema = z.union([
  z.literal("dom"),
  z.literal("pixi"),
]);

export type ParsedGameRendererKind = z.infer<typeof gameRendererKindSchema>;
