import express from "express";
import * as auth from "../middleware/auth.js";
import * as User from "../controllers/usersController.js";

const router = express.Router();

router.get("/", User.findAllUser);
// router.get("/:id", User.findUserById);
router.get("/current-user", auth.auth, User.getCurrentUser);
router.post("/signup", User.createUser);
router.post("/login", User.loginUser);
router.put("/:id", auth.auth, User.updateUserById);
router.delete("/delete", auth.auth, User.deleteUser);

export default router;
