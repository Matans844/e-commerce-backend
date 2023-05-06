import { type Document, type Model } from 'mongoose'
import { type IUser } from '../../types/index.js'
import { type UserEventEmitter } from '../events/UserEventEmitter.js'

/**
 * Will be populated by the schema
 */
export interface IUserDocument extends IUser, Document {
  doesPasswordMatch: (password: string) => Promise<boolean>
  emitter: UserEventEmitter
}

/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface UserModel extends Model<UserModel> {
}
