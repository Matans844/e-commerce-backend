// Links:
// https://mongoosejs.com/docs/connections.html
// https://stackoverflow.com/questions/68915722/option-usefindandmodify-is-not-supported
// https://www.npmjs.com/package/dotenv
import mongoose from "mongoose";
const MONGO_URI = process.env['MONGO_URI'] || '';
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=database.js.map