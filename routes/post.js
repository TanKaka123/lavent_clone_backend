import express from "express";
import uploadCloud from "../middlewares/upload.js";
import { getPost, getPosts, postPost, deletePost } from "../controllers/post.js"

const route = express.Router();

route.get("/",getPosts);
route.get("/:id",getPost);

route.delete("/:id",deletePost);
route.post("/",uploadCloud.single("file"),postPost);

export default route;