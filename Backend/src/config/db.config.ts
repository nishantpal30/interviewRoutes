import mongoose from "mongoose";
import dotenv  from "dotenv";

dotenv.config();



export const connectDB = async () => {
    try {
        const databaseURI = process.env.DATABASE_URI;

        if (!databaseURI) {
            throw new Error("DATABASE_URI is not defined");
        }

        await mongoose.connect(databaseURI);

        console.log("DataBase Connected Successfully");
    } catch (error) {
        console.error("DataBase Connection Failed:", error);
        process.exit(1);
    }
};
