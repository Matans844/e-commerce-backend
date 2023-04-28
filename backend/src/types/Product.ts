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

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface ProductModel extends Model<ProductDocument> {}