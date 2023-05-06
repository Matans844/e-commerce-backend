import { type Document, type Model } from 'mongoose'
import { type ICart } from '../../types/index.js'

export interface ICartDocument extends ICart, Document {
  on: (event: 'cartDeleted', listener: () => void) => this
  once: (event: 'cartDeleted', listener: () => void) => this
  emit: (event: 'cartDeleted') => boolean
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface CartModel extends Model<ICartDocument> {
}
