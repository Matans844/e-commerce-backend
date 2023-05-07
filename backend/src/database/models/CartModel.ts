import { model, Schema } from 'mongoose'
import { type ICartDocument, type IProductDocument } from '../documents/index.js'
import { ProductModel } from './ProductModel.js'
import { type CartEventHandler } from '../eventHandlers/CartEventHandler.js'
import { type ICartItem } from '../../types/index.js'

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

function setupListenersForProduct (cart: ICartDocument, product: IProductDocument): void {
  const cartEventHandler: CartEventHandler = cart.eventHandler

  product.eventHandler.addListener('productDeleted', (productId: string) => {
    void cartEventHandler.onProductDeleted(productId)
  })
  product.eventHandler.on('emitProductQuantityInStockChanged', (productId: string, newQuantity: number) => {
    void cartEventHandler.onProductQuantityChanged(productId, newQuantity)
  })
}

/**
 * Add product to cart.
 * Also, add the cart as listener to the product if it is new in the cart
 * @param cartDocument
 * @param productId
 * @param quantity
 *
 * TODO: Again, problems with model vs. document
 *
 */
cartModel.methods.addProductToCartById = async function (cartDocument: ICartDocument, productId: string, quantity: number) {
  const productDocument = await ProductModel.findById(productId)

  if (productDocument == null) {
    throw new Error('Product not found.')
  }

  if (quantity > productDocument.countInStock) {
    throw new Error('Cannot add more quantity to cart than exists in stock\'')
  }

  const existingItemIndex: number = this.cartItems.findIndex((item: ICartItem) => item.productId === productId)

  if (existingItemIndex < 0) {
    // Add new cart item
    this.cartItems.push({ productId, quantity })

    // Add cart as listener
    setupListenersForProduct(cartDocument, productDocument)
  } else {
    // Update existing cart item quantity
    // Keep in mind that mongoose uses Number and TypeScript uses number
    const oldQuantity: number = this.cartItems[existingItemIndex].quantity
    const newQuantity = oldQuantity + quantity
    if (newQuantity > productDocument.countInStock) {
      throw new Error('Cannot add more quantity to cart than exists in stock')
    }
    this.cartItems[existingItemIndex].quantity = Number(newQuantity)
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

/**
 *
 * @param productId
 * @param newQuantity
 *
 * TODO: You should be able to add negative quantity here (negative update)
 */
cartModel.methods.updateQuantityProductInCartById = async function (productId: string, newQuantity: number) {
  if (newQuantity < 0) {
    throw new Error('Product quantity cannot be negative.')
  }

  if (newQuantity === 0) {
    this.removeProductById(productId)
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

cartModel.pre('save', function (this: ICartDocument, next) {
  if (this.isNew) {
    this.eventHandler = new CartEventHandler(this)
    this.eventHandler.on('userDeleted', (userId: string) => {
      this.eventHandler.onUserDeleted(userId)
    })
  }

  next()
})
 */

/**
 * Notify listeners of self deletion event
 */
cartModel.pre('remove', function (this: ICartDocument, next) {
  this.eventHandler.emitCartDeleted()

  next()
})

export const CartModel = model<ICartDocument>('Cart', cartModel)
