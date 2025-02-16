import express from "express";
import authRoutes from "./auth.routes";
import roleRoute from "./role.routes";
import categoryRoute from "./category.routes";
import itemRoutes from "./item.routes";
import borrowRoutes from "./borrower.routes";

const router = express.Router();

router.use("/", roleRoute);
router.use("/users", authRoutes);
router.use("/categories", categoryRoute);
router.use("/items", itemRoutes);
router.use("/borrows", borrowRoutes);

export default router;
