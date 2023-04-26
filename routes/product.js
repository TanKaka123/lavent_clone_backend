import express from "express";
import uploadCloud from "../middlewares/upload.js";
import { getProduct, getProducts, postProduct, deleteProduct } from "../controllers/product.js";
const route = express.Router();

route.get("/",getProducts);
route.get("/:id",getProduct);
route.delete("/:id",deleteProduct);
route.post("/",uploadCloud.single("file"),postProduct);


export default route; 