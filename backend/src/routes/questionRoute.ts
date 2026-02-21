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

        const { title, description, tagName } = parsedData.data;

        let responseData = [];

        const userId = req.id;

        await pool.query("BEGIN");

        const createQuestion = await pool.query('INSERT INTO questions("title", "description", "userid") VALUES($1, $2, $3) RETURNING id, title,description, userid, created_at',
            [title, description, userId]
        )

        responseData.push(createQuestion.rows[0]);

        const createTag = await pool.query('INSERT INTO tags("tag_name", "usage_count") VALUES($1, 1) ON CONFLICT ("tag_name") DO UPDATE SET usage_count = tags.usage_count + 1 RETURNING id, tag_name, usage_count', [tagName]);

        responseData.push(createTag.rows[0]);

        const questionId = createQuestion.rows[0].id;
        const tagId = createTag.rows[0].id;

        await pool.query('INSERT INTO questiontag("tagid", "questionid") VALUES($1, $2)', [tagId, questionId]);

        await pool.query("COMMIT");

        return res.status(201).json({
            "success": true,
            "data": responseData
        })

    } catch (error) {
        await pool.query("ROLLBACK");
        return res.status(401).json({
            "success": false,
            "error": { "Error While Creating Question": error }
        })
    }
})

questionRoute.get('/getQuestion/:questionId', AuthMiddleware, async (req, res) => {
    try {
        const questionId = req.params.questionId;

        // Implemented Pagination for Answers ORDER BY id ASC LIMIT 20.
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

questionRoute.get('/search', AuthMiddleware, async (req, res) => {
    try {

        const { searchText } = req.query || {};

        console.log('title',searchText);

        const fetchQuestionByQuery = await pool.query("SELECT DISTINCT q.*  FROM questions q   LEFT JOIN questiontag qt ON q.id = qt.questionid  LEFT JOIN tags t ON t.id = qt.tagid   WHERE q.title ILIKE '%' || $1 || '%'  OR  q.description ILIKE '%' || $1 || '%'  OR t.tag_name ILIKE '%' || $1 || '%'  ORDER BY q.created_at DESC", [searchText]);

        console.log('FetchQuery Done', fetchQuestionByQuery.rows);

        if (fetchQuestionByQuery.rows.length === 0) {
            return res.status(404).json({
                "success": false,
                "error": "Cannot Get The Question"
            })
        }

        return res.status(201).json({
            "success": true,
            "data": fetchQuestionByQuery.rows
        })

    } catch (error) {
        return res.status(404).json({
            "success": false,
            "error": { "Error While Finding The Question": error }
        })
    }
})


export default questionRoute;
