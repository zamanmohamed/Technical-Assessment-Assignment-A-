import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/authController";
import protect from "../middlewares/authMiddleware";
const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
