import asyncHandler from 'express-async-handler'

import { type Request, type Response } from '../types/index.js'
import { CartModel } from '../database/models/index.js'

/**
 * @description Get all carts
 * @route GET /api/carts
 * @access Private/Admin
 */
const getAllCarts = asyncHandler(async (req: Request, res: Response) => {
  const carts = await CartModel.find({})

  if (carts.length > 0) {
    res.json(carts)
  } else {
    res.status(404)
    throw new Error('No carts found')
  }
})

/**
 * @description Get a cart by id
 * @route GET /api/carts/:id
 * @access Private/Admin
 */
const getCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const cart = await CartModel.findById(id)

  if (cart !== null) {
    res.json(cart)
  } else {
    res.status(404)
    throw new Error('Cart not found')
  }
})

/**
 * @description Delete a cart by id
 * @route DELETE /api/carts/:id
 * @access Private/Admin
 */
const deleteCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  const cart = await CartModel.findById(id)
  if (cart !== null) {
    await cart.remove()
    res.json({ message: 'Success: Cart removed' })
  } else {
    res.status(404)
    throw new Error('Cart not found')
  }
})

/**
 * @description Add product by id in cart by id
 * @route POST /api/carts/:id/:productId
 * @access Private/Admin
 */
const addProductByIdInCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id, productId } = req.params as { id: string, productId: string }
  const { quantity } = req.body as { quantity: number }
  const cartToAddTo = await CartModel.findById(id)

  if (cartToAddTo !== null) {
    void cartToAddTo.addProductToCartById(productId, quantity)
    res.json({ message: 'Success: Product added to cart' })
  } else {
    res.status(404)
    throw new Error('Cart not found')
  }
})

/**
 * @description Delete product by id in cart by id
 * @route DELETE /api/carts/:id/:productId
 * @access Private/Admin
 */
const deleteProductByIdInCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id, productId } = req.params as { id: string, productId: string }
  const cartToAddTo = await CartModel.findById(id)

  if (cartToAddTo !== null) {
    void cartToAddTo.deleteProductFromCartById(productId)

    res.json({ message: 'Success: Product deleted from cart' })
  } else {
    res.status(404)
    throw new Error('Cart not found')
  }
})

/**
 * @description Update product quantity by product id in cart by id
 * @route PUT /api/carts/:id/:productId
 * @access Private/Admin
 */
const updateProductByIdInCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id, productId } = req.params as { id: string, productId: string }
  const { quantityToUpdate } = req.body as { quantityToUpdate: number }
  const cartToAddTo = await CartModel.findById(id)

  if (cartToAddTo !== null) {
    void cartToAddTo.updateQuantityProductInCartById(productId, quantityToUpdate)

    res.json({ message: 'Success: Product quantity in cart updated' })
  } else {
    res.status(404)
    throw new Error('Cart not found')
  }
})

/**
 * @description Update a product quantity by id
 * @route PUT /api/carts/mycart
 * @access Private
 */
const getCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = req.user?.cart

  if (cart !== undefined) {
    res.json(cart)
  } else {
    res.status(404)
    throw new Error('User has no cart')
  }
})

export {
  getAllCarts,
  getCartById,
  deleteCartById,
  addProductByIdInCartById,
  deleteProductByIdInCartById,
  updateProductByIdInCartById,
  getCart
}
