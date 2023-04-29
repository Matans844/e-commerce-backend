/*
import * as jwt from 'jsonwebtoken'
import { type Secret } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { type NextFunction, type Request, type Response } from '../types/index.js'
import { User } from '../database/models/index.js'
import { type Decoded } from '../types/authentication/IjwtDecoded.js'

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

    if (token == null) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  }
)

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user != null) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }

 */
