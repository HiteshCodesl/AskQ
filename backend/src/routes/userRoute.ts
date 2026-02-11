import express from "express"
import { signupSchema } from "../types/userTypes.js";
import pool from "../db/db.js";
import bcrypt from "bcrypt"

const userRoute = express.Router();

userRoute.post('/signup', async (req, res) => {
    try {
        const parsedData = signupSchema.safeParse(req.body);

        if (parsedData.error) {
            return res.status(401).json({
                "success": false,
                "error": "Please Send The Right Credentials"
            })
        }

        const { name, email, password } = parsedData.data;

        const checkUser = await pool.query('SELECT * FROM users WHERE email= $1', [email]);

        if (checkUser) {
            return res.status(401).json({
                "success": false,
                "error": "Already User, Try Login"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);

        if (!user) {
            return res.status(401).json({
                "success": false,
                "error": "User Not Created, Error While Creating User"
            })
        }

        return res.status(201).json({
            "success": true,
            "data": user
        })
    } catch (error) {
        return res.status(401).json({
            "success": false,
            "error": {
                "Error While Creating User": error
            }
        })
    }
})

userRoute.post('/login', (req, res) => {

})

userRoute.get('/me', (req, res) => {

})


export default userRoute;