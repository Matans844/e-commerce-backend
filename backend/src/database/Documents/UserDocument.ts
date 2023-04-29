import { type Document, type Model } from 'mongoose'
import { type IUser } from '../../types/index.js'

/**
 * Will be populated by the schema
 */
export interface UserDocument extends IUser, Document {
  doesPasswordMatch: (password: string) => Promise<boolean>
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface UserModel extends Model<UserModel> {
}
