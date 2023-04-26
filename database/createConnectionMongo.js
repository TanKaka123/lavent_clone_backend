import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export default async function connection() {
    const mongooDB = process.env.DB_MONGODB
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(mongooDB, connectionParams);
        console.log("connected to database mongoodb");
    } catch (error) {
        console.log(error);
        console.log("could not connect to database");
    }
};
 