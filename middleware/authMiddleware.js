import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    let authHeader = req.headers["authorization"]; // Ensure the header name is lowercase
    let token = authHeader && authHeader.split(" ")[1]; // Extract the token after 'Bearer'

    if (!token) {
        return res.status(401).json({ status: "unauthorized", message: "Token not provided" });
    }
    // Verify the token
    jwt.verify(token, "aditto", (err, decoded) => {
        if (err) {
            console.log("Token verification error:", err);
            return res.status(401).json({ status: "unauthorized", message: "Invalid token" });
        }


        let user = decoded["data"];

        req.user = user;

        next();
    });
};

export default authMiddleware;
