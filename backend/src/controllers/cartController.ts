import asyncHandler from 'express-async-handler'
import { type Request, type Response } from '../types/index.js'
import { UserModel, ProductModel } from '../database/models/index.js'

/**
 * Get all carts
 * @route GET /api/carts
 * @access Private/Admin
 */
const getAllCarts = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.find({}).sort({ name: 1 })

  if (users.length > 0) {
    res.json(users)
  } else {
    res.status(404)
    throw new Error('No users found')
  }
})

/**
 * Get a cart by id
 * @route GET /api/carts/:id
 * @access Private
 */
const getCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const user = await UserModel.findById(id).select('-password')

  if (user != null) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/**
 * Delete a cart by id
 * @route DELETE /api/carts/:id
 * @access Private
 */
const deleteCartById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }

  const user = await UserModel.findById(id)
  if (user != null) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/**
 * Add product by product id
 * @route POST /api/carts/:id/:productId
 * @access Private
 */
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

/**
 * Delete product by product id
 * @route DELETE /api/carts/:id/:productId
 * @access Private
 */
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

/**
 * Update product quantity by product id
 * @route PUT /api/carts/:id/:productId
 * @access Private
 */
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

export {
  authUser,
  registerUser,
  getUsers,
  deleteUserById,
  getUserById,
  updateUser
}
