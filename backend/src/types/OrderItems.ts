import {ProductDocument} from "./Product";

/**
 * Represents an order item (which can be several products)
 */
export interface OrderItems {
    name: string;
    quantity: number;
    price: number;
    product: ProductDocument;
}