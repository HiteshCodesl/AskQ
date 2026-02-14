import express from "express"
import { askQuestionSchema } from "../utils/questionTypes.js";
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
            "SELECT u.id AS users_id, u.name AS users_name, q.id AS questions_id, q.title AS questions_title, q.description AS questions_description, q.created_at AS questions_created_at, a.id AS answers_id, a.userid AS answers_userid, a.answer AS answers_answer, a.created_at AS answers_created_at FROM questions q INNER JOIN users u ON q.userid = u.id  LEFT JOIN answers a ON q.id = a.questionid WHERE q.id = $1", [questionId]);

        if (getQuestionDetails.rows.length === 0) {
            return res.status(404).json({
                "success": false,
                "error": "Cannot Get The Question, Please Send Valid QuestionId"
            })
        }

        const resultRows = getQuestionDetails.rows;

        if (resultRows.length == 0) return null;

        const question = {
            id: resultRows[0].questions_id,
            title: resultRows[0].questions_title,
            description: resultRows[0].questions_description,
            createdAt: resultRows[0].questions_created_at,
            user: {
                id: resultRows[0].users_id,
                name: resultRows[0].users_name,
            },
            answers: [] as {
                id: number,
                userId: number,
                answer: string,
                createdAt: Date
            }[]
        };

        for (const row of resultRows) {
            if (row.answers_id) {
                question.answers.push({
                    id: row.answers_id,
                    userId: row.answers_userid,
                    answer: row.answers_answer,
                    createdAt: row.answers_created_at,
                });
            }
        }

        return res.status(201).json({
            "success": true,
            "data": question
        })

    } catch (error) {
        return res.status(404).json({
            "success": false,
            "error": { "Error While Finding The Question": error }
        })
    }
})

export default questionRoute;
