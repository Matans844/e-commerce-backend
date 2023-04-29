import { type Request as Req, type Response as Res, type NextFunction as Next } from 'express'

/**
 * Custom Interface used in combination with Express Request / Response types
 */
interface User {
  user?: {
    _id: string
    name: string
    email: string
  }
}

/**
 * Combine Express types with customer User interface
 */
export type Request = Req & User
export type Response = Res & User
export type NextFunction = Next
