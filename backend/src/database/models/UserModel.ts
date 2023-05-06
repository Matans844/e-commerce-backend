import bcrypt from 'bcryptjs'
import { model, Schema } from 'mongoose'
import { CartModel } from './CartModel.js'
import { type ICartDocument, type IUserDocument } from '../documents/index.js'
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
 * Runs before the model saves.
 * Checks to see the user has a cart.
 * If not, a new cart is created according to the cart model.
 */
userModel.pre('save', async function (this: IUserDocument, next) {
  if (this.isNew || (this.cart == null)) {
    const newCart = await CartModel.create({
      cartItems: [],
      priceItems: 0.0,
      active: true
    })

    // Set up a listener for the 'cartDeleted' event on the cart instance associated with this user
    newCart.eventHandler.on('cartDeleted', (cart: ICartDocument) => {
      // Call the delegate to handle the event
      void this.eventHandler.onCartDeleted(cart)
    })

    this.cart = newCart
  }
  next()
})

userModel.methods.onCartDeleted = function (cartId: string) {
  console.log('User cart deleted', cartId)
  // Do something here when the cart is deleted
}

/**
 * Make sure the user document instance has an event emitter.
 */
userModel.pre('save', function (this: IUserDocument, next) {
  if (this.isNew) {
    this.eventHandler = new UserEventHandler(this)
  }
  next()
})

/**
 * Notify listeners of self deletion event
 */
userModel.pre('remove', async function (this: IUserDocument, next) {
  this.eventHandler.emit('userDeleted', this._id)
  next()
})

/*
userModel.post('init', function (doc: IUserDocument) {
  doc.cart.on('cartDeleted', async function (cartId) {
    // Do something here when the cart is deleted
  })
})
*/

export const UserModel = model<IUserDocument>('User', userModel)
