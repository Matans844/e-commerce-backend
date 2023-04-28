import { type ProductDocument } from './Product.js'

/**
 * Represents an order item (which can be several products)
 */
export interface OrderItems {
  name: string
  quantity: number
  price: number
  product: ProductDocument
}
