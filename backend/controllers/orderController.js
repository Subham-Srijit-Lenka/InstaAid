import orderModel from "../models/orderModel.js";

export const createOrderController = async (req, res) => {
    try {
        const { products, payment } = req.body;
        const order = await new orderModel({
            products,
            payment,
            buyer: req.user._id,
        }).save();

        res.status(201).send({
            success: true,
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send({
            success: false,
            message: "Error while creating order",
            error,
        });
    }
};
