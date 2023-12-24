import express from "express";
const router = express.Router();
import { findByEmail, create } from "../controllers/user-controller";

router.route("/login").get(findByEmail);
router.route("/registry").post(create);

export default router;
