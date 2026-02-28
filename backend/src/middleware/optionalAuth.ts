import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"


export async function optionalAuthMiddleware(req:Request, res:Response, next: NextFunction){
    try{
    const token = req.headers["authorization"] as string;

    if(!token){
        return next();
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if(decoded){
        req.id = decoded.id;
    }

    next();

   }catch(error){
     return res.status(404).json({
            "success": false,
            "error": {"Error while Verifing Token": error}
        })      
   }
}