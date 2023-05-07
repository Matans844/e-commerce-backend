import { type Document, type Model } from 'mongoose'
import { type CartEventHandler } from '../eventHandlers/CartEventHandler.js'
import { type ICart } from '../../types/index.js'

export interface ICartDocument extends ICart, Document {
  eventHandler: CartEventHandler
  addProductToCartById: (cartId: string, productId: string, quantity: number) => Promise<void>
  deleteProductFromCartById: (cartId: string, productId: string) => Promise<void>
  updateQuantityProductInCartById: (cartId: string, productId: string, newQuantity: number) => Promise<void>
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface CartModel extends Model<ICartDocument> {
}
