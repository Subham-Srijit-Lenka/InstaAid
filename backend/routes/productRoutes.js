import express from "express";
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    searchProductController,
    updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

router.post("/create", formidable(), requireSignIn, isAdmin, createProductController);
router.put("/update/:pid", formidable(), requireSignIn, isAdmin, updateProductController);
router.delete("/delete/:pid", requireSignIn, isAdmin, deleteProductController);


router.get("/", getProductController);
router.get("/:slug", getSingleProductController);
router.get("/photo/:pid", productPhotoController);
router.post("/filters", productFiltersController);
router.get("/count", productCountController);
router.get("/list/:page", productListController);
router.get("/search/:keyword", searchProductController);

export default router;
