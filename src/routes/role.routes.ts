import express from "express";
import athenticate from "../middlewares/authMiddleware";
import roleController from "../controllers/roleController";

const router = express.Router();

router.post(
	"/roles",
	athenticate.authenticateUser,
	athenticate.isAdmin,
	roleController.createRole
);

router.get(
	"/roles",
	athenticate.authenticateUser,
	athenticate.isAdmin,
	roleController.getRoles
);

router.get(
	"/roles/:id",
	athenticate.authenticateUser,
	roleController.getRoleById
);

router.post(
	"/users/:userId/roles",
	athenticate.authenticateUser,
	athenticate.isAdmin,
	roleController.assignRole
);

router.delete(
	"roles/:id",
	athenticate.authenticateUser,
	athenticate.isAdmin,
	roleController.deleteRole
);

export default router;
