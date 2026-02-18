import express from "express";
import { AuthMiddleware } from "../middleware/auth.js";
import { questionVoteType } from "../utils/questionVoteTypes.js";
import pool from "../db/db.js";
import { answerVoteType } from "../utils/answerVoteType.js";

const voteRoute = express.Router();

voteRoute.post('/questionVote/:questionId', AuthMiddleware, async (req, res) => {
    try{
    const parsedData = questionVoteType.safeParse(req.body);

    if(parsedData.error){
        return res.status(401).json({
            "success": false,
            "error": "Please Send A Valid data"
        })
    }
    const { voteType} = parsedData.data;
    const questionId = Number(req.params.questionId);

    const userId = req.id;
    console.log("userId", userId, "questionId",questionId, "voteType", voteType )
    await pool.query("BEGIN");
    console.log("Transcation Started");
    const findVoteStatus = await pool.query('SELECT vote_type FROM questionvote WHERE questionid=$1 AND userid=$2 FOR UPDATE', [questionId, userId]);
    console.log("FIndvoteState Done");
    console.log("isVoteStatueFound", findVoteStatus.rows);

    if(findVoteStatus.rows.length === 0){
        // Add New Vote
        await pool.query('INSERT INTO questionvote(vote_type, questionid, userid) VALUES($1, $2, $3)', [voteType, questionId, userId]);

        await pool.query('UPDATE questions SET score = score + $1  WHERE id = $2', [voteType, questionId]);
    }else {
        const oldVoteType = findVoteStatus.rows[0].vote_type;
        console.log("oldVoteType", oldVoteType);
        if(oldVoteType === voteType){
            //remove the vote 
            await pool.query('DELETE FROM questionvote WHERE vote_type=$1 AND questionid=$2 AND userid=$3', [voteType, questionId, userId]);

            await pool.query(`UPDATE questions SET score = score - $1 WHERE id=$2`, [oldVoteType, questionId]);
        }else{
        // change the vote
            const delta =  voteType - oldVoteType; 
            await pool.query('UPDATE questionvote SET vote_type=$1 WHERE questionid=$2 AND userid=$3', [voteType, questionId, userId])

            await pool.query('UPDATE questions SET score = score + $1 WHERE id=$2', [delta, questionId]);
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


voteRoute.post('/answerVote/:answerId', AuthMiddleware, async (req, res) => {
    try{
    const parsedData = answerVoteType.safeParse(req.body);

    if(parsedData.error){
        return res.status(401).json({
            "success": false,
            "error": "Please Send A Valid data"
        })
    }
    const { voteType} = parsedData.data;

    const answerId = Number(req.params.answerId);

    const userId = req.id;

        console.log("userId", userId, "answerId",answerId, "voteType", voteType )

    await pool.query("BEGIN");

    const findVoteStatus = await pool.query('SELECT vote_type FROM answervote WHERE answerid=$1 AND userid=$2 FOR UPDATE', [answerId, userId]);

    if(findVoteStatus.rows.length === 0){
        // Add New Vote
        await pool.query('INSERT INTO answervote(vote_type, answerid, userid) VALUES($1, $2, $3)', [voteType, answerId, userId]);

        await pool.query('UPDATE answers SET score = score + $1 WHERE id = $2', [voteType, answerId]);
    }else {
        const oldVoteType = findVoteStatus.rows[0].vote_type;
        if(oldVoteType === voteType){
            //remove the vote 
            await pool.query('DELETE FROM answervote WHERE vote_type=$1 AND answerid=$2 AND userid=$3', [voteType, answerId, userId]);

            await pool.query(`UPDATE answers SET score = score - $1 WHERE id=$2`, [oldVoteType, answerId]);
        }else{
        // change the vote
            const delta =  voteType - oldVoteType; 
            await pool.query('UPDATE answervote SET vote_type=$1 WHERE answerid=$2 AND userid=$3', [voteType, answerId, userId])

            await pool.query('UPDATE answers SET score = score + $1 WHERE id=$2', [delta, answerId]);
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