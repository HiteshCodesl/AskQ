import jwt, {} from "jsonwebtoken";
export async function AuthMiddleware(req, res, next) {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(404).json({
                "success": false,
                "error": "Cannot Get the Token"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            req.id = decoded.id;
            next();
        }
        else {
            return res.status(404).json({
                "success": false,
                "error": "Incorrect Token"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            "success": false,
            "error": { "Error while Verifing Token": error }
        });
    }
}
//# sourceMappingURL=auth.js.map