import {Document, Model} from "mongoose";
import {OrderItems} from "./OrderItems.js";
import {ShippingAddress} from "./ShippingAddress.js";
import {PaymentResult} from "./PaymentResult.js";
import {OrderCompositePrice} from "./OrderCompositePrice.js";

/**
 * Represents an order
 */
export interface Order {
    user: string;
    orderItems: OrderItems[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentResult: PaymentResult;
    orderCompositePrice: OrderCompositePrice;
    isPaid: boolean;
    paymentDate: Date;
}

export interface OrderDocument extends Order, Document {}

// TODO: Is the following necessary? I have models defined elsewhere
export interface OrderModel extends Model<OrderDocument> {}