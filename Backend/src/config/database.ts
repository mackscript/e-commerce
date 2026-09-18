import mongoose from "mongoose";

const createDatabase = async (): Promise<void> => {
    try {

        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defiend");
        }
        await mongoose.connect(mongoUri);

        console.log("🟢 MongoDB connected successfully")
    } catch (error) {
        console.error("🔴 MongoDB connection failed");

        if (error instanceof Error) {
            console.error(error.message);
        }

        process.exit()
    }
}


export default createDatabase;
