import express from "express"
import { answerSchema } from "../Utils/answerTypes.js";
import pool from "../db/db.js";
import { AuthMiddleware } from "../middleware/auth.js";

const answerRoute = express.Router();

answerRoute.post('/postAnswer/:questionId', AuthMiddleware, async (req, res) => {
    try {
        const parsedData = answerSchema.safeParse(req.body);
        const questionId = req.params.questionId;
        const userId = req.id;

        if (parsedData.error) {
            return res.status(404).json({
                "success": false,
                "error": "Send a Valid Answer"
            })
        }

        const { answer } = parsedData.data;

        const submitAnswer = await pool.query('INSERT INTO answers (answer, userid, questionid) VALUES($1, $2, $3) RETURNING id, answer, userid, created_at', [answer, userId, questionId]);

        if (submitAnswer.rows.length === 0) {
            return res.status(404).json({
                "success": false,
                "error": "Answer Not Submitted, try again"
            })
        }

        return res.status(201).json({
            "success": true,
            "data": submitAnswer.rows[0]
        })

    } catch (error) {
        return res.status(404).json({
            "success": false,
            "error": { "Answer Not Submitted, try again": error }
        })
    }
})

export default answerRoute;