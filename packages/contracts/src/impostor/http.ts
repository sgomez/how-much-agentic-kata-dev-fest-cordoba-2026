// HTTP contract of the impostor service.
//
// Owned by the impostor group. Routes use the game `:code` and the round number `:n`
// (1-based). Errors use `ErrorBody` from `src/index.ts`.
import { z } from "zod";

/** Where a round stands for the impostor vote. */
export const VotingPhase = z.enum(["none", "voting", "verdict"]);
export type VotingPhase = z.infer<typeof VotingPhase>;

/** Caught: the impostor has strictly more votes than any other player. A tie is escaped. */
export const VerdictOutcome = z.enum(["caught", "escaped"]);
export type VerdictOutcome = z.infer<typeof VerdictOutcome>;

/** One player's final pick of who they think the impostor was. */
export const Vote = z.object({
  voterId: z.string().min(1),
  targetId: z.string().min(1),
});
export type Vote = z.infer<typeof Vote>;

/** GET /internal/games/:code/rounds/:n/voting (service to service: called by games) */
export const VotingPhaseResponse = z.object({
  phase: VotingPhase,
});
export type VotingPhaseResponse = z.infer<typeof VotingPhaseResponse>;

/** The verdict of one round, with every vote. */
export const Verdict = z.object({
  outcome: VerdictOutcome,
  impostorId: z.string().min(1),
  votes: z.array(Vote),
});
export type Verdict = z.infer<typeof Verdict>;

/** GET /internal/games/:code/rounds/:n/verdict (service to service: called by scoring; 409 until the voting ends) */
export const RoundVerdictResponse = Verdict;
export type RoundVerdictResponse = z.infer<typeof RoundVerdictResponse>;

/**
 * GET /internal/games/:code/verdicts (service to service: called by scoring)
 * One entry per round whose voting has ended, ordered by `round`. Rounds still
 * voting or without an impostor are left out; a game with none returns an empty list.
 */
export const GameVerdictsResponse = z.object({
  verdicts: z.array(Verdict.extend({ round: z.number().int().positive() })),
});
export type GameVerdictsResponse = z.infer<typeof GameVerdictsResponse>;

/**
 * GET /api/impostor/games/:code/rounds/:n (phone)
 * Per-player view. `outcome` and `catcherIds` only appear once the phase is `verdict`;
 * `catcherIds` are the voters of the impostor and is empty when the impostor escaped.
 */
export const RoundVotingViewResponse = z.object({
  phase: VotingPhase,
  canVote: z.boolean(),
  myVote: z.string().min(1).nullable(),
  outcome: VerdictOutcome.optional(),
  catcherIds: z.array(z.string().min(1)).optional(),
});
export type RoundVotingViewResponse = z.infer<typeof RoundVotingViewResponse>;

/** POST /api/impostor/games/:code/rounds/:n/votes (phone; answers 204 with no body; a vote is final) */
export const CastVoteRequest = z.object({
  targetId: z.string().min(1),
});
export type CastVoteRequest = z.infer<typeof CastVoteRequest>;
