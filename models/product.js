import mongoose from "mongoose";
import { v4 as uuid } from "uuid";



const creator = {
  id: {
    type: String
  },
  username: {
    type: String
  },
 fullname: {
    type: String
  }
}
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid(),
  },
  creator:{
    type: creator,
    require: true
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  size: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
export { productSchema };
