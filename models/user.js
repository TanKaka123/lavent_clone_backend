import mongoose from "mongoose"; 
import { post } from "./post.js";


const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
   
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  fullname: {
    type: String,
    required: true,
  },

  dob: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: 0,
  },
  cart: {
    type: [String],
    default: [],
  },
  love: {
    type: [String],
    default: [],
  },
  purchased: {
    type: [String],
    default: [],
  },
  post: {
    type: [post],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("Users", userSchema);
export default Users;
export { userSchema };
