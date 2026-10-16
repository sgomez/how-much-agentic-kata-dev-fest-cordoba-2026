import { z } from "zod";

/** Why a player earned points in a round. */
export const PointsReason = z.enum([
  "closest",
  "exact",
  "impostor-escaped",
  "catcher",
]);
export type PointsReason = z.infer<typeof PointsReason>;

/** What one player earned in one round. */
export const RoundPoints = z.object({
  playerId: z.string().min(1),
  nickname: z.string().min(1),
  /** The estimate this player sent, or null when they sent none. */
  estimate: z.number().nullable(),
  points: z.number().int().nonnegative(),
  reasons: z.array(PointsReason),
});
export type RoundPoints = z.infer<typeof RoundPoints>;

/**
 * GET /scoring/:code/rounds/:n/points (answers 409 while the round is not revealed)
 * Before the impostor's verdict it only carries placement points.
 */
export const RoundPointsResponse = z.object({
  players: z.array(RoundPoints),
  verdictPending: z.boolean(),
});
export type RoundPointsResponse = z.infer<typeof RoundPointsResponse>;

/** A player's place in the scoreboard. */
export const ScoreboardRow = z.object({
  playerId: z.string().min(1),
  nickname: z.string().min(1),
  points: z.number().int().nonnegative(),
  rank: z.number().int().positive(),
});
export type ScoreboardRow = z.infer<typeof ScoreboardRow>;

/** GET /scoring/:code/scoreboard */
export const ScoreboardResponse = z.object({
  rows: z.array(ScoreboardRow),
  roundsPlayed: z.number().int().nonnegative(),
});
export type ScoreboardResponse = z.infer<typeof ScoreboardResponse>;
