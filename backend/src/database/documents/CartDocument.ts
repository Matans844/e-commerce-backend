import { type Document, type Model } from 'mongoose'
import { type ICart } from '../../types/index.js'

export interface CartDocument extends ICart, Document {
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface CartDocument extends Model<CartDocument> {
}
