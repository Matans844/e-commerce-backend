import * as jwt from 'jsonwebtoken'
import { type Secret } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { type NextFunction, type Request, type Response } from '../types/index.js'
import { UserModel } from '../database/models/index.js'
import { type Decoded } from '../types/authorization/IjwtDecoded.js'

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token

  const secret: Secret = process.env.JWT_SECRET

  if (req.header !== undefined && req.headers.authorization !== undefined && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (token == null) {
    res.status(401).json({ message: 'Not authorized, no token' })
    return
  }

  try {
    const decoded = jwt.verify(token, secret) as Decoded

    try {
      const user = await UserModel.findById(decoded.id).select('-password')

      if (user == null) {
        throw new Error('User not found')
      }

      req.user = user
      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: 'Not authorized, user not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Not authorized, token failed' })
  }
})

/**
 * Middleware used to protect routes from users who are not flagged as admin
 *
 */
const admin = (req: Request, res: Response, next: NextFunction): void => {
  // The nullish coalescing operator ('??') helps explicitly protect against objects that can be `null` or `undefined`.
  if (req.user?.isAdmin ?? false) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
