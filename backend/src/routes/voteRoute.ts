import express from "express";
import { AuthMiddleware } from "../middleware/auth.js";
import { questionVoteType } from "../utils/questionVoteTypes.js";
import pool from "../db/db.js";
import { answerVoteType } from "../utils/answerVoteType.js";

const voteRoute = express.Router();

voteRoute.post('/questionVote', AuthMiddleware, async (req, res) => {
    try{
    const parsedData = questionVoteType.safeParse(req.body);

    if(parsedData.error){
        return res.status(401).json({
            "success": false,
            "error": "Please Send A Valid data"
        })
    }
    const {questionId, voteType} = parsedData.data;

    const userId = req.id;

    await pool.query("BEGIN");

    const findVoteStatus = await pool.query('SELECT vote_type FROM questionvote WHERE questionid=$1, userid=$2 FOR UPDATE', [questionId, userId]);

    if(findVoteStatus.rows.length === 0){
        // Add New Vote
        await pool.query('INSERT INTO questionvote(vote_type, questionid, userid) VALUES($1, $2, $3)', [voteType, questionId, userId]);

        await pool.query('UPDATE questions SET score = $1', [voteType]);
    }else {
        const oldVoteType = findVoteStatus.rows[0].vote_type;
        if(oldVoteType === voteType){
            //remove the vote 
            await pool.query('DELETE FROM questionvote WHERE vote_type=$1, questionid=$2, userid=$3', [voteType, questionId, userId]);

            await pool.query(`UPDATE question SET score - $1 WHERE id=$2`, [oldVoteType, questionId]);
        }else{
        // change the vote
            const delta =  voteType - oldVoteType; 
            await pool.query('UPDATE questionvote SET vote_type=$1 WHERE questionid=$2, userid=$3', [voteType, questionId, userId])

            await pool.query('UPDATE questions SET score + $1 WHERE id=$2', [delta, questionId]);
        }
    };

    await pool.query("COMMIT");

    return res.status(201).json({
        "success": true
    })
    }catch(error){
        await pool.query("ROLLBACK");
        return res.status(401).json({
            "success": false,
            "message": "Something Went Wrong",
            "error":  error
        })
    }
});


voteRoute.post('/answerVote', AuthMiddleware, async (req, res) => {
    try{
    const parsedData = answerVoteType.safeParse(req.body);

    if(parsedData.error){
        return res.status(401).json({
            "success": false,
            "error": "Please Send A Valid data"
        })
    }
    const {answerId, voteType} = parsedData.data;

    const userId = req.id;

    await pool.query("BEGIN");

    const findVoteStatus = await pool.query('SELECT vote_type FROM answervote WHERE answerid=$1, userid=$2 FOR UPDATE', [answerId, userId]);

    if(findVoteStatus.rows.length === 0){
        // Add New Vote
        await pool.query('INSERT INTO answervote(vote_type, answerid, userid) VALUES($1, $2, $3)', [voteType, answerId, userId]);

        await pool.query('UPDATE answers SET score = $1', [voteType]);
    }else {
        const oldVoteType = findVoteStatus.rows[0].vote_type;
        if(oldVoteType === voteType){
            //remove the vote 
            await pool.query('DELETE FROM answervote WHERE vote_type=$1, answerid=$2, userid=$3', [voteType, answerId, userId]);

            await pool.query(`UPDATE answers SET score - $1 WHERE id=$2`, [oldVoteType, answerId]);
        }else{
        // change the vote
            const delta =  voteType - oldVoteType; 
            await pool.query('UPDATE answervote SET vote_type=$1 WHERE answerid=$2, userid=$3', [voteType, answerId, userId])

            await pool.query('UPDATE answers SET score + $1 WHERE id=$2', [delta, answerId]);
        }
    };

    await pool.query("COMMIT");

    return res.status(201).json({
        "success": true
    })
    }catch(error){
        await pool.query("ROLLBACK");
        return res.status(401).json({
            "success": false,
            "message": "Something Went Wrong",
            "error":  error
        })
    }
});

export default voteRoute;