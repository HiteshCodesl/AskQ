import z from "zod";

export const questionVoteType = z.object({
    questionId: z.string(),
    voteType: z.union([
        z.literal(-1),
        z.literal(1)
    ], {
        message: "Vote Must Be Valid Number"
    })
})

