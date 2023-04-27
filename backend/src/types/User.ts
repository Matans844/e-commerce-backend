import { Model, Document } from "mongoose";

/**
 * Represents a user
 */
export interface User {
    name: string;
    email: string;
    password: string;
    address: string;
    matchPassword: (password: string) => Promise<Boolean>;
}

export interface UserDocument extends User, Document {}

// TODO: Is the following necessary? I have models defined elsewhere
export interface UserModel extends Model<UserDocument> {}