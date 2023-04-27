// Links:
// https://mongoosejs.com/docs/connections.html
// https://stackoverflow.com/questions/68915722/option-usefindandmodify-is-not-supported
// https://www.npmjs.com/package/dotenv

import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI );
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error: any) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}
