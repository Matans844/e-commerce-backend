import { type Document, type Model } from 'mongoose'
import { type OrderItems } from './OrderItems.js'
import { type ShippingAddress } from './ShippingAddress.js'
import { type PaymentResult } from './PaymentResult.js'
import { type OrderCompositePrice } from './OrderCompositePrice.js'

/**
 * Represents an order
 */
export interface Order {
  user: string
  orderItems: OrderItems[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  paymentResult: PaymentResult
  orderCompositePrice: OrderCompositePrice
  isPaid: boolean
  paymentDate: Date
}

export interface OrderDocument extends Order, Document {}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface OrderModel extends Model<OrderDocument> {}
