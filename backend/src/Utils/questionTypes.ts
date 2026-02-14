import z from "zod"

export const askQuestionSchema = z.object({
    title: z.string(),
    description: z.string()  
})