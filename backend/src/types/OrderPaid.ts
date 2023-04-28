import { type Document, type Model } from 'mongoose'
import { type PaymentResult } from './PaymentResult.js'
import { type OrderUnpaid } from './OrderUnpaid.js'

/**
 * Represents an order
 */
export interface OrderPaid extends OrderUnpaid {
  paymentMethod: string
  paymentDate: Date
  paymentResult: PaymentResult
}

export interface OrderDocument extends OrderPaid, Document {}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface OrderModel extends Model<OrderDocument> {}
