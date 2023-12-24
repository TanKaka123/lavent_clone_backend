import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export default async function connection() {
    const mongooDB = "mongodb+srv://username123:oq6f3HVT41jdDRH9@restaurant-booking.a3sw4mu.mongodb.net/?retryWrites=true&w=majority"
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
 