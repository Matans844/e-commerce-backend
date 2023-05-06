import { type Document, type Model } from 'mongoose'
import { type IProduct } from '../../types/index.js'

export interface IProductDocument extends IProduct, Document {
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface ProductModel extends Model<ProductModel> {
}
