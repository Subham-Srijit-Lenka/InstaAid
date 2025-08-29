import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Access Denied - No token provided",
            });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized - Invalid token",
            error,
        });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user?._id) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized - User info missing",
            });
        }

        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        if (user.role !== 1) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized - Admin only",
            });
        }

        next();
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        res.status(500).send({
            success: false,
            message: "Error in admin middleware",
            error,
        });
    }
};
