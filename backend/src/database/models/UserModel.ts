import bcrypt from 'bcryptjs'
import { model, Schema } from 'mongoose'
import { CartModel } from './CartModel.js'
import { type IUserDocument } from '../documents/index.js'
import { UserEventHandler } from '../eventHandlers/UserEventHandler.js'

const userModel = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    cart: {
      type: CartModel,
      default: {
        cartItems: [],
        priceItems: 0.0,
        active: true
      },
      ref: 'Cart'
    }

  },
  {
    timestamps: true // Automatically create createdAt timestamp
  }
)

/**
 * Uses Bcrypt to check that a user's entered password matches the stored user's password
 * @param enteredPassword The password that a user enters
 */
userModel.methods.doesPasswordMatch = async function (
  this: any,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password)
}

/**
 * Runs before the model saves.
 * Checks to see if the password has been modified.
 * Hashes the password before saving to the database.
 */
userModel.pre('save', async function (this: IUserDocument, next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

/**
 * If this is a new instance, make sure that:
 * 1. A cart exists.
 * 2. The cart document instance has an event emitter.
 * 3. User is listening to cart.
 *
 */
userModel.pre('save', async function (this: IUserDocument, next) {
  if (this.isNew) {
    this.cart = await CartModel.create({
      cartItems: [],
      priceItems: 0.0,
      active: true
    })

    this.eventHandler = new UserEventHandler(this)

    // Set up a listener for the 'cartDeleted' event on the cart instance associated with this user
    this.cart.eventHandler.on('cartDeleted', (cartId: string) => {
      // Call the delegate to handle the event
      this.eventHandler.onCartDeleted(cartId)
    })
  }
  next()
})

/**
 * Notify listeners of self deletion event
 */
userModel.pre('remove', async function (this: IUserDocument, next) {
  this.eventHandler.emitUserDeleted()

  next()
})

export const UserModel = model<IUserDocument>('User', userModel)
