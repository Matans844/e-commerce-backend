import { model, Schema } from 'mongoose'
import { type IProductDocument } from '../documents/index.js'
import { ProductEventEmitter } from '../events/ProductEventEmitter.js'

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
 */
productModel.pre('save', function (this: IProductDocument, next) {
  if (this.isNew) {
    this.emitter = new ProductEventEmitter(this)
  }
  next()
})

/**
 * Notify listeners of self deletion event
 */
productModel.pre('remove', async function (this: IProductDocument, next) {
  this.emitter.emit('productDeleted', this._id)
  next()
})

export const ProductModel = model<IProductDocument>('Product', productModel)
