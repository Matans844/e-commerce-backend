import { model, Schema } from "mongoose";
import { ProductDocument } from "../types/Product.js";

const productSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0.0,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = model<ProductDocument>("Product", productSchema);