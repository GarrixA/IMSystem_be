import express from "express";
import borrowController from "../controllers/borrowerController";
import athenticate from "../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "",
  athenticate.authenticateUser,
  athenticate.isAdmin,
  borrowController.create_borrow
);

router.get("/", borrowController.get_all_borrows);

router.get("/:id", borrowController.get_single_borrow);

router.patch(
  "/:id",
  athenticate.authenticateUser,
  athenticate.isAdmin,
  borrowController.update_borrow
);

// router.delete(
//   "/:id",
//   athenticate.authenticateUser,
//   borrowController.delete_borrow
// );

export default router;
