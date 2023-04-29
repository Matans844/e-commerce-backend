import { model, Schema } from 'mongoose'
import { type ProductDocument } from '../documents/index.js'

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
      default: 0.0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

export const Product = model<ProductDocument>('Product', productModel)
