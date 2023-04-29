import asyncHandler from 'express-async-handler'
import { type Request, type Response } from '../types/express/express.js'
import { UserModel } from '../database/models/index.js'
import generateToken from '../utilities/generateAuthToken.js'

/**
 * Authenticate user and get token
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string, password: string }

  const user = await UserModel.findOne({ email })

  if ((user != null) && (await user.doesPasswordMatch(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

/**
 * Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name: string
    email: string
    password: string
  }

  const userExists = await UserModel.findOne({ email })

  if (userExists != null) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await UserModel.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

/**
 * Get all users
 * @route GET /api/users
 * @access Private/Admin
 */
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.find({})
  res.json(users)
})

/**
 * Delete a user
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
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
 * Get a user by ID
 * @route GET /api/users/:id
 * @access Private/Admin
 */
const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const user = await UserModel.findById(id).select('-password')

  if (user != null) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserById
}
