import express from "express";
const router = express.Router();
import {
  create,
  findAll,
  findById,
  updateById,
  deleteById
} from "../controllers/reservation.js";

router.route("/create-reservation").post(create);
router.route("/read-reservation").get(findAll);
router.route("/read-reservation/:reservationId").get(findById);
router.route("/update-reservation/:reservationId").put(updateById);
router.route("/delete-reservation/:reservationId").patch(deleteById);

export default router;
