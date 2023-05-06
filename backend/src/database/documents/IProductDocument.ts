import { type Document, type Model } from 'mongoose'
import { type IProduct } from '../../types/index.js'
import { type ProductEventHandler } from '../eventHandlers/ProductEventHandler.js'

export interface IProductDocument extends IProduct, Document {
  eventHandler: ProductEventHandler
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface ProductModel extends Model<ProductModel> {
}
