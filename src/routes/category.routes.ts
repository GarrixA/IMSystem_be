import { Router } from "express";
import {
	createCategory,
	getCategories,
	getCategoryById,
	updateCategory,
	deleteCategory,
} from "../controllers/categoryController";
import athenticate from "../middlewares/authMiddleware";

const router = Router();

router.post(
	"/",
	athenticate.authenticateUser,
	// athenticate.isAdmin,
	createCategory
);
router.get(
	"/",
	athenticate.authenticateUser,
	// athenticate.isAdmin,
	getCategories
);
router.get(
	"/:id",
	athenticate.authenticateUser,
	// athenticate.isAdmin,
	getCategoryById
);
router.put(
	"/:id",
	athenticate.authenticateUser,
	// athenticate.isAdmin,
	updateCategory
);
router.delete(
	"/:id",
	athenticate.authenticateUser,
	// athenticate.isAdmin,
	deleteCategory
);

export default router;
