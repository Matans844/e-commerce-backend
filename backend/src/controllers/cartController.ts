/*
import asyncHandler from 'express-async-handler'

import { type Request, type Response } from '../types/index.js'
import { UserModel, ProductModel, CartModel } from '../database/models/index.js'

**
 * Get all carts
 * @route GET /api/carts
 * @access Private/Admin
 *
const getAllCarts = asyncHandler(async (req: Request, res: Response) => {
  const carts = await CartModel.find({})

  if (carts.length > 0) {
    res.json(carts)
  } else {
    res.status(404)
    throw new Error('No carts found')
  }
})

**
 * Get a cart by id
 * @route GET /api/carts/:id
 * @access Private/Admin
 *
const getCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const cart = await CartModel.findById(id)

  if (cart != null) {
    res.json(cart)
  } else {
    res.status(404)
    throw new Error('Cart not found')
  }
})

**
 * Delete a cart by id
 * @route DELETE /api/carts/:id
 * @access Private/Admin
 *
const deleteCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  const cart = await CartModel.findById(id)
  if (cart != null) {
    await cart.remove()
    res.json({ message: 'Cart removed' })
  } else {
    res.status(404)
    throw new Error('Cart not found')
  }
})

**
 * Add product by product id
 * @route POST /api/carts/:id/:productId
 * @access Private
 *
const addProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const user = await UserModel.findById(id)

  if (user != null) {
    user.name = req.body?.name ?? user.name
    user.email = req.body?.email ?? user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

**
 * Delete product by product id
 * @route DELETE /api/carts/:id/:productId
 * @access Private
 *
const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const user = await UserModel.findById(id)

  if (user != null) {
    user.name = req.body?.name ?? user.name
    user.email = req.body?.email ?? user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

**
 * Update product quantity by product id
 * @route PUT /api/carts/:id/:productId
 * @access Private
 *
const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const user = await UserModel.findById(id)

  if (user != null) {
    user.name = req.body?.name ?? user.name
    user.email = req.body?.email ?? user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

**
 * @description Update a product quantity by id
 * @route PUT /api/carts/:id/:productId
 * @access Private
 *
const updateQuantityOfProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const {
    name,
    description,
    price,
    countInStock
  } = req.body as {
    name: string
    description: string
    price: number
    countInStock: number
  }

  const product = await ProductModel.findById(id)

  if (product != null) {
    product.name = name
    product.description = description
    product.price = price
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found.')
  }
})

export {
  getAllCarts,
  getCartById,
  deleteCartById,
  addProductById,
  deleteProductById,
  updateQuantityOfProductById
}

*/
