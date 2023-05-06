import { model, Schema } from 'mongoose'
import { type IProductDocument } from '../documents/index.js'
import { ProductEventHandler } from '../eventHandlers/ProductEventHandler.js'

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
    this.eventHandler = new ProductEventHandler(this)
  }
  next()
})

/**
 * Notify listeners of self deletion event
 */
productModel.pre('remove', async function (this: IProductDocument, next) {
  this.eventHandler.emit('productDeleted', this._id)
  next()
})

export const ProductModel = model<IProductDocument>('Product', productModel)
