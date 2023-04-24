// Links:
// https://mongoosejs.com/docs/connections.html
// https://stackoverflow.com/questions/68915722/option-usefindandmodify-is-not-supported
// https://www.npmjs.com/package/dotenv

import mongoose from "mongoose";
import { config } from 'dotenv';

config();

const MONGO_URL = process.env['MONGO_URL'] || '';

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGO_URL);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error : any) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;