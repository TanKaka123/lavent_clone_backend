import express from "express";
const router = express.Router();
import {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
} from "../controllers/reservation.js";

router.route("/create-restaurant").post(create);
router.route("/read-restaurant").get(findAll);
router.route("/read-restaurant/:restaurantId").get(findById);
router.route("/update-restaurant/:restaurantId").put(updateById);
router.route("/delete-restaurant/:restaurantId").patch(deleteById);

export default router;
