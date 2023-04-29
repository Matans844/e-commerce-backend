import { type IProduct } from '../product/IProduct.js'

/**
 * Represents a product that can be added to cart / order.
 * This means
 */
export interface IProductItem {
  product: IProduct
  quantity: number
  price: number
}
