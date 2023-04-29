import { type Document, type Model } from 'mongoose'
import { type IOrder } from '../../models/index.js'

export interface OrderDocument extends IOrder, Document {
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface OrderModel extends Model<OrderDocument> {
}
