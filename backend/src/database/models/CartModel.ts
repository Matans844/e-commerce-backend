import { model, Schema } from 'mongoose'
import {type ICartDocument, IProductDocument, type IUserDocument} from '../documents/index.js'
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
 * If this is a new instance, make sure that:
 * 1. The cart document instance has an event emitter.
 * 2. Cart is listening to user.
 *
 * TODO: Listen to products, orders
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

/**
 * Adds product to cart.
 * Also, adds the cart as listener to the product if it is new in the cart
 * @param productID
 * @param quantity
 */
cartModel.methods.addProductById = async function(productID, quantity) {
  const productToAdd = await ProductModel.findById(productID)
  if (productToAdd == null) {
    throw new Error('Product not found. It should first be added to store.')
  }

  const existingItemIndex = this.cartItems.findIndex(item => item.productID === productID)
  if (existingItemIndex >= 0) {
    // Update existing cart item quantity
    this.cartItems[existingItemIndex].quantity += quantity
  } else {
    // Add new cart item
    this.cartItems.push({ productID, quantity })
    // Add cart as listener
    this.cart.
    productToAdd.eventHandler.on('productDeleted', (product: IProductDocument) => {
      this.eventHandler.onProductDeleted(product)
    })
    this.cart.productToAdd.eventHandler.on('productQuantityChanged', (product: IProductDocument, newQuantity: number) => {
      this.eventHandler.onProductQuantityChanged(product, newQuantity)
    })
  }
  await this.save()
}

/**
 * Removes product from cart by productId
 * @param productID
 */
cartModel.methods.removeProductById = async function(productID) {
  const existingItemIndex = this.cartItems.findIndex(item => item.productID === productID)
  if (existingItemIndex >= 0) {
    // Remove cart item
    this.cartItems.splice(existingItemIndex, 1)
    await this.save()
  }
  else{
    throw new Error('Product does not exist in cart.')
  }
}


cartModel.methods.changeQuantityProductById = async function(productID, newQuantity){
  const existingItemIndex = this.cartItems.findIndex(item => item.productID === productID)
  if (existingItemIndex >= 0) {
    // Update cart item
    this.cartItems[existingItemIndex].quantity = newQuantity
    await this.save()
  }
  else{
    throw new Error('Product does not exist in cart.')
  }
}

export const CartModel = model<ICartDocument>('Cart', cartModel)
