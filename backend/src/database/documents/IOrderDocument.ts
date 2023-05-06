import { type Document, type Model } from 'mongoose'
import { type IOrder } from '../../types/index.js'

export interface IOrderDocument extends IOrder, Document {
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface OrderModel extends Model<OrderModel> {
}
