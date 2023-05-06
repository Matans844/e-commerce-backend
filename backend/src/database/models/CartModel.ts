import { model, Schema } from 'mongoose'
import { type ICartDocument, type IUserDocument } from '../documents/index.js'
import { CartEventHandler } from '../eventHandlers/CartEventHandler.js'
import { ProductModel } from './ProductModel.js'

/**
 * Reference:
 * https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose
 */
const cartModel = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    cartItems: {
      type: [
        {
          productID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
          },
          quantity: {
            type: Number,
            required: true,
            min: 0
          }
        }
      ],
      default: []
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

/**
 * Computes and returns the price field of a single cartItem,
 * based on the productID and quantity fields,
 * but it is not stored in the database
 */
cartModel.virtual('cartItemPrice').get(async function (productItem) {
  const product = await ProductModel.findById(productItem.productID)
  if (product == null) {
    return 0
  }
  return product.price * productItem.quantity
})

/**
 * Computes and returns the priceItems field,
 * based on the productItems field,
 * but it is not stored in the database.
 */
cartModel.virtual('priceItems').get(async function (this: ICartDocument) {
  let total = 0
  for (const item of this.cartItems) {
    const itemPrice = await this.cartItemPrice(item)
    total += itemPrice
  }
  return total
})

/**
 * Make sure the cart document instance has an event emitter.
 */
cartModel.pre('save', function (this: ICartDocument, next) {
  if (this.isNew) {
    this.eventHandler = new CartEventHandler(this)
    this.user.eventHandler.on('userDeleted', (user: IUserDocument) => {
      this.eventHandler.onUserDeleted(this.user)
    })
  }
  next()
})

/**
 * Notify listeners of self deletion event
 */
cartModel.pre('remove', async function (this: ICartDocument, next) {
  this.eventHandler.emit('cartDeleted', this._id)

  next()
})

export const CartModel = model<ICartDocument>('Cart', cartModel)
