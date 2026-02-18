import express from "express"
import { loginSchema, signupSchema } from "../utils/userTypes.js";
import pool from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthMiddleware } from "../middleware/auth.js";

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

        const checkUser = await pool.query('SELECT id,name,email FROM users WHERE email= $1', [email]);

        if (checkUser.rows.length > 0) {
            return res.status(401).json({
                "success": false,
                "error": "Already User, Try Login"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id,name,email', [name, email, hashedPassword]);

        if (user.rows.length === 0) {
            return res.status(401).json({
                "success": false,
                "error": "User Not Created, Error While Creating User"
            })
        }

        return res.status(201).json({
            "success": true,
            "user": user.rows[0]
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

userRoute.post('/login', async (req, res) => {
    try {
        const parsedData = loginSchema.safeParse(req.body);

        if (parsedData.error) {
            return res.status(401).json({
                "success": false,
                "error": "Please Send The Right Credentials"
            })
        }

        const { email, password } = parsedData.data;

        const isUserExists = await pool.query('SELECT id,name,email,password FROM users WHERE email=$1', [email]);

        if (isUserExists.rows.length === 0) {
            return res.status(401).json({
                "success": false,
                "error": "User Not Exists, Try Signup"
            })
        }

        const checkPassword = await bcrypt.compare(password, isUserExists.rows[0].password);

        if (!checkPassword) {
            return res.status(401).json({
                "success": false,
                "error": "Incorrect Email or Password"
            })
        }

        const token = jwt.sign({
            id: isUserExists.rows[0].id
        }, process.env.JWT_SECRET!);

        if (token) {
            return res.status(201).json({
                "success": true,
                "token": token
            })
        }
    } catch (error) {
        return res.status(401).json({
            "success": false,
            "error": {
                "Error While SignIn User": error
            }
        })
    }
})

userRoute.get('/me', AuthMiddleware, async (req, res) => {
    try {
        const userId = req.id;

        const user = await pool.query("SELECT id,name,email FROM users WHERE id=$1", [userId]);

        if (user.rows.length === 0) {
            return res.status(401).json({
                "success": false,
                "error": "User Not Found"
            })
        }

        return res.status(201).json({
            "success": true,
            "user": user.rows[0]
        })
    } catch (error) {
        return res.status(404).json({
            "success": false,
            "error": { "Error While Fetching User": error }
        })
    }
})

export default userRoute;