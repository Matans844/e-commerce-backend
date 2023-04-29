import { type NextFunction, type Request, type Response } from '../types/index.js'
import { User } from '../database/models/index.js'
import { type Decoded } from '../types/authentication/IjwtDecoded.js'
import * as jwt from 'jsonwebtoken'
import { type Secret } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

/**
 * Middleware used to protect routes from unauthorized users
 */
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const secret: Secret = process.env.JWT_SECRET!

    if ((req.headers?.authorization?.startsWith('Bearer')) === true) {
      try {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, secret) as Decoded

        req.user = await User.findById(decoded.id).select('-password')
        next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  }
)

/**
 * Middleware used to protect routes from users who are not flagged as admin
 */
const admin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user != null) && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
