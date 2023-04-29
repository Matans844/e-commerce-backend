import { type Model, type Document } from 'mongoose'

export interface IProduct {
  name: string
  description: string
  price: number
  getProductID: () => string
}

export interface ProductDocument extends IProduct, Document {}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface ProductModel extends Model<ProductDocument> {}
