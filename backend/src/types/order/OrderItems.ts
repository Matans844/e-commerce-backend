import { type ProductDocument } from '../product/Product.js'

/**
 * Represents an order item (which can be several products)
 */
export interface OrderItems {
  name: string
  quantity: number
  price: number
  product: ProductDocument
}
