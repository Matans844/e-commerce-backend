import { Model, Document } from "mongoose";

/**
 * Represents a user
 */
export interface User {
    name: string;
    email: string;
    password: string;
    address: string;
}

/**
 * Will be populated by the schema
 */
export interface UserDocument extends User, Document {
    doesPasswordMatch: (password: string) => Promise<Boolean>;
}

export interface UserModel extends Model<UserDocument> {}

export interface UserDocument extends User, Document {}


/**
 * Will be used by the schema
 * TODO: Check if this is true
 */
export interface UserModel extends Model<UserDocument> {}