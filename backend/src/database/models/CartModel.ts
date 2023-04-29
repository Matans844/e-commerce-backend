import { model, Schema } from 'mongoose'
import { type CartDocument } from '../documents/index.js'

/**
 * Reference:
 * https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose
 */
const cartModel = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    productItems: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    priceItems: {
      type: Number,
      required: true,
      default: 0.0
    },
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

export const Cart = model<CartDocument>('Cart', cartModel)
