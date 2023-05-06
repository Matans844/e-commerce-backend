import { type Document, type Model } from 'mongoose'
import { type CartEventEmitter } from '../events/CartEventEmitter.js'
import { type ICart } from '../../types/index.js'

export interface ICartDocument extends ICart, Document {
  emitter: CartEventEmitter
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface CartModel extends Model<ICartDocument> {
}
