// Links:
// https://mongoosejs.com/docs/connections.html
// https://stackoverflow.com/questions/68915722/option-usefindandmodify-is-not-supported

import mongoose from "mongoose";
import { config } from 'dotenv';

config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;