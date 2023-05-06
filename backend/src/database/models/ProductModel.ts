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

/**
 * Make sure the product document instance has an event emitter.
 * The product does not need to listen to users or carts.
 *
 * TODO: Listen to orders

productModel.pre('save', function (this: IProductDocument, next) {
  if (this.isNew) {
    this.eventHandler = new ProductEventHandler(this)
  }
  next()
})
 */

/**
 * Notify listeners of self deletion event
 */
productModel.pre('remove', async function (this: IProductDocument, next) {
  this.eventHandler.emitProductDeleted()
  next()
})

export const ProductModel = model<IProductDocument>('Product', productModel)
