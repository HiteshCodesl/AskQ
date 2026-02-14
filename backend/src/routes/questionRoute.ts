import express from "express"
import { askQuestionSchema } from "../Utils/questionTypes.js";
import { AuthMiddleware } from "../middleware/auth.js";
import pool from "../db/db.js";

const questionRoute = express.Router();

questionRoute.post('/ask', AuthMiddleware, async (req, res) => {
    try {
        const parsedData = askQuestionSchema.safeParse(req.body);

        if (parsedData.error) {
            return res.status(401).json({
                "success": false,
                "error": "Please Send A Valid Title and Description"
            })
        }

        const { title, description } = parsedData.data;

        const userId = req.id;

        const createQuestion = await pool.query('INSERT INTO questions("title", "description", "userid") VALUES($1, $2, $3) RETURNING id, title,description, userid, created_at',
            [title, description, userId]
        )

        if (createQuestion.rows.length === 0) {
            return res.status(401).json({
                "success": false,
                "error": "Question Cannot Be Created"
            })
        }

        return res.status(201).json({
            "success": true,
            "data": createQuestion.rows[0]
        })
    } catch (error) {
        return res.status(401).json({
            "success": false,
            "error": { "Error While Creating Question": error }
        })
    }
})

questionRoute.get('/getQuestion/:questionId', AuthMiddleware, async (req, res) => {
    try {
        const questionId = req.params.questionId;

        const getQuestionDetails = await pool.query(
            "SELECT users.id, users.name, questions.title, questions.description, questions.created_at, answers.id, answers.userid, answers.answer, answers.created_at FROM questions INNER JOIN users ON questions.userid = users.id  LEFT JOIN answers ON questions.id = answers.questionid WHERE questions.id = $1", [questionId]);

        if (getQuestionDetails.rows.length === 0) {
            return res.status(404).json({
                "success": false,
                "error": "Cannot Get The Question, Please Send Valid QuestionId"    
            })
        }

        return res.status(201).json({
            "success": true,
            "data": getQuestionDetails.rows[0]
        })

    } catch (error) {
        return res.status(404).json({
            "success": false,
            "error": { "Error While Finding The Question": error }
        })
    }
})

export default questionRoute;
