import { type Document, type Model } from 'mongoose'
import { type CartEventHandler } from '../eventHandlers/CartEventHandler.js'
import { type ICart } from '../../types/index.js'
import { type IUserDocument } from './IUserDocument.js'

export interface ICartDocument extends ICart, Document {
  eventHandler: CartEventHandler
  user: IUserDocument
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface CartModel extends Model<ICartDocument> {
}
