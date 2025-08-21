import mongoose from "mongoose";

export const connectDB = async () => {
    try{
       const mongoUrl = process.env.MONGODB_URL;
       if (!mongoUrl) {
           throw new Error("MONGODB_URL environment variable is not defined");
       }
       const conn = await mongoose.connect(mongoUrl);
       console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch(err){
        console.error("Error connecting to DB", err);
    }
}
