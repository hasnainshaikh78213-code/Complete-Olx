import express from "express";
import { signup, login } from "../controllers/userController.js";
import User from "../models/User.js";

const router = express.Router();

//  Signup
router.post("/signup", signup);

//  Login
router.post("/login", login);

//  Get all users (for admin panel)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ msg: "Error fetching users", error: err.message });
  }
});

export default router;
