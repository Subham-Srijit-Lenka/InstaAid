import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log("Token received:", token);

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Access Denied - No token provided",
            });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded JWT:", req.user);

        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).send({
            success: false,
            message: "Unauthorized - Invalid token",
        });
    }
};


export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user || user.role !== 1) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized - Admin only",
            });
        }

        next();
    } catch (error) {
        res.status(500).send({ success: false, message: "Error in admin middleware" });
    }
};

