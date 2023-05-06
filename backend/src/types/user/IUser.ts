import { type ICart } from '../cart/ICart.js'

/**
 * Represents a user
 */
export interface IUser {
  name: string
  email: string
  password: string
  address: string
  isAdmin?: boolean
  cart?: ICart
}
