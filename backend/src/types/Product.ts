import { Model, Document } from "mongoose";

/**
 * Represents a product
 */
export interface Product {
    name: string;
    description: string;
    price: number;
}

export interface ProductDocument extends Product, Document {}

// TODO: Is the following necessary? I have models defined elsewhere
export interface ProductModel extends Model<ProductDocument> {}