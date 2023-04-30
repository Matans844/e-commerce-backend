/**
 * Represents a user
 */
export interface IUser {
  name: string
  email: string
  password: string
  address: string
  isAdmin?: boolean
}
