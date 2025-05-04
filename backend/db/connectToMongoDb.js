import mongoose from "mongoose";

export const connectToMongoDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("error in connecting to mongodb",error.message);
    }
};
export default connectToMongoDb;