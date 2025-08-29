import productModel from "../models/productmodel.js";
import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";

dotenv.config();

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if (!name || !description || !price || !quantity) {
            return res.status(400).send({ error: "All fields are required" });
        }
        if (photo && photo.size > 1000000) {
            return res
                .status(400)
                .send({ error: "Photo should be less than 1MB" });
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();

        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error creating product", error });
    }
};

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({})
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            countTotal: products.length,
            products,
        });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error getting products", error });
    }
};

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo");
        res.status(200).send({ success: true, product });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error getting product", error });
    }
};

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product?.photo?.data) {
            res.set("Content-Type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
        res.status(404).send({ message: "No photo found" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error getting photo", error });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({ success: true, message: "Product Deleted" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error deleting product", error });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if (!name || !description || !price || !quantity) {
            return res.status(400).send({ error: "All fields are required" });
        }
        if (photo && photo.size > 1000000) {
            return res.status(400).send({ error: "Photo should be less than 1MB" });
        }

        const product = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();

        res.status(200).send({
            success: true,
            message: "Product Updated",
            product,
        });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error updating product", error });
    }
};

export const productFiltersController = async (req, res) => {
    try {
        const { radio } = req.body;
        let args = {};
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

        const products = await productModel.find(args).select("-photo");
        res.status(200).send({ success: true, products });
    } catch (error) {
        res.status(400).send({ success: false, message: "Error filtering products", error });
    }
};

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.estimatedDocumentCount();
        res.status(200).send({ success: true, total });
    } catch (error) {
        res.status(400).send({ success: false, message: "Error counting products", error });
    }
};

export const productListController = async (req, res) => {
    try {
        const perPage = 8;
        const page = req.params.page || 1;

        const products = await productModel.find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        res.status(200).send({ success: true, products });
    } catch (error) {
        res.status(400).send({ success: false, message: "Error in pagination", error });
    }
};

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).select("-photo");

        res.json(results);
    } catch (error) {
        res.status(400).send({ success: false, message: "Error searching products", error });
    }
};
