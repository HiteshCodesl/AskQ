import z from "zod";

export const answerVoteType = z.object({
    answerId: z.string(),
    voteType: z.union([
        z.literal(-1),
        z.literal(1)
    ], {
        message: "Vote Must Be Valid Number"
    })
})

