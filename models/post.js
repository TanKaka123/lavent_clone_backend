import mongoose from "mongoose";
import {v4 as uuid} from "uuid";

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

const post = new mongoose.Schema({
    id:{
        type:String,
        default : uuid()
    },
    creator:{
        type: creator,
        require: true,
      },
    title:{
        type: String,
        require:true
    },
    thumbnail:{
        type: String,
        require:true
    },
    content:{
        type:String
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})

const postSchema = mongoose.model("Post", post);

export default postSchema;
export {post};