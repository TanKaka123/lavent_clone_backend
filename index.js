import express from "express";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import postRoute from "./routes/post.js";

import restaurantRoute from "./routes/restaurant.js";
import reservationRoute from "./routes/reservation.js";
import userRoute from "./routes/user.js";

import createConnectionMongo from "./database/createConnectionMongo.js";
import cors  from "cors";
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(cors());
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
createConnectionMongo();


app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/reservation",reservationRoute);
app.use("/api/v1/user", userRoute);


const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log("listen port 8080")
})