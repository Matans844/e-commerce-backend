import bcrypt from 'bcryptjs'
import { model, Schema } from 'mongoose'
import { type UserDocument } from '../documents/index.js'

const userModel = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true // Automatically create createdAt timestamp
  }
)

/**
 * Uses Bcrypt to check that a user's entered password matches the stored user's password
 * @param enteredPassword The password that a user enters
 */
userModel.methods.doesPasswordMatch = async function (
  this: any,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password)
}

/**
 * Runs before the model saves.
 * Checks to see if the password has been modified.
 * Hashes the password before saving to the database.
 */
userModel.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export const UserModel = model<UserDocument>('User', userModel)
