import { type Document, type Model } from 'mongoose'
import { type PaymentResult } from './PaymentResult.js'
import { type ShippingAddress } from './ShippingAddress.js'
import { type OrderCompositePrice } from './OrderCompositePrice.js'
import { type OrderItems } from './OrderItems.js'

/**
 * Represents an order
 */
export interface Order {
  user: string
  orderItems: OrderItems[]
  shippingAddress: ShippingAddress
  orderCompositePrice: OrderCompositePrice
  paymentMethod: string
  paymentResult: PaymentResult
  isPaid: boolean
  paymentDate: Date
}

export interface OrderDocument extends Order, Document {}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface OrderModel extends Model<OrderDocument> {}
