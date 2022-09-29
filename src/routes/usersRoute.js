import express from "express";
import * as User from "../controllers/usersController.js";

const router = express.Router();

router.get("/", User.findAllUser);
router.get("/:id", User.findUserById);
router.post("/signup", User.createUser);
router.put("/:id", User.updateUserById);
router.delete("/delete/:id", User.deleteUser);

export default router;
