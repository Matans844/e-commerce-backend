import { model, Schema } from 'mongoose'
import { type IProductDocument } from '../documents/index.js'

const productModel = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
      min: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 1,
      min: 0
    }
  },
  {
    timestamps: true
  }
)

export const ProductModel = model<IProductDocument>('Product', productModel)
