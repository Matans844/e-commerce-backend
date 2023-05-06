import { model, Schema } from 'mongoose'
import { type ICartDocument, type ICartItem } from '../documents/index.js'
import { ProductModel } from './ProductModel.js'
import { CartEventHandler } from '../eventHandlers/CartEventHandler.js'

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
          productId: {
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
cartModel.virtual('priceItems').get(function (this: ICartDocument) {
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
    this.eventHandler.on('userDeleted', (userId: string) => {
      this.eventHandler.onUserDeleted(userId)
    })
  }

  next()
})

/**
 * Notify listeners of self deletion event
 */
cartModel.pre('remove',  function (this: ICartDocument, next) {
  this.eventHandler.emitCartDeleted()

  next()
})

/**
 * Adds product to cart.
 * Also, adds the cart as listener to the product if it is new in the cart
 * @param productId
 * @param quantity
 */
cartModel.methods.addProductToCartById = async function (productId: string, quantity: number) {
  const productToAdd = await ProductModel.findById(productId)
  if (productToAdd == null) {
    throw new Error('Product not found. It should first be added to store.')
  }
  if (quantity <= 0) {
    throw new Error('Cannot set non-positive quantity of product in cart')
  } else if (quantity > productToAdd.countInStock) {
    throw new Error('Cannot add more quantity to cart than exists in stock')
  } else {
    const existingItemIndex = this.cartItems.findIndex((item: ICartItem) => item.productId === productId)
    if (existingItemIndex >= 0) {
      // Update existing cart item quantity
      // Keep in mind that mongoose uses Number and TypeScript uses number
      const oldQuantity = this.cartItems[existingItemIndex].quantity.valueOf() as number
      const newQuantity = oldQuantity + quantity
      if (newQuantity > productToAdd.countInStock) {
        throw new Error('Cannot add more quantity to cart than exists in stock')
      }
      this.cartItems[existingItemIndex].quantity = Number(newQuantity)
    } else {
      // Add new cart item
      this.cartItems.push({ productId, quantity })
      // Add cart as listener
      this.cart
        .productToAdd.eventHandler.on('productDeleted', (productId: string) => {
          this.eventHandler.onProductDeleted(productId)
        })
      this.cart.productToAdd.eventHandler.on('emitProductQuantityInStockChanged', (productId: string, newQuantity: number) => {
        this.eventHandler.onProductQuantityChanged(productId, newQuantity)
      })
    }
  }
  await this.save()
}

/**
 * Removes product from cart by productId
 * @param productId
 */
cartModel.methods.deleteProductFromCartById = async function (productId: string) {
  const existingItemIndex = this.cartItems.findIndex((item: ICartItem) => item.productId === productId)
  if (existingItemIndex >= 0) {
    // Remove cart item
    this.cartItems.splice(existingItemIndex, 1)
    await this.save()
  } else {
    throw new Error('Product does not exist in cart.')
  }
}

cartModel.methods.updateQuantityProductInCartById = async function (productId: string, newQuantity: number) {
  if (newQuantity === 0) {
    this.removeProductById(productId)
  } else if (newQuantity < 0) {
    throw new Error('Product quantity cannot be negative.')
  } else {
    const existingItemIndex = this.cartItems.findIndex((item: ICartItem) => item.productId === productId)
    if (existingItemIndex >= 0) {
      // Update cart item
      this.cartItems[existingItemIndex].quantity = Number(newQuantity)
      await this.save()
    } else {
      throw new Error('Product does not exist in cart.')
    }
  }
}

export const CartModel = model<ICartDocument>('Cart', cartModel)
