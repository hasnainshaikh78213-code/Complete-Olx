import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//  Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const isAdmin = email === "developers@gmail.com";

    const newUser = new User({ name, email, password: hashedPassword, isAdmin });
    await newUser.save();

    const token = jwt.sign(
  { id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    res.status(201).json({
      msg: "User created successfully",
      token,
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

//  Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
  { id: user._id, email: user.email, isAdmin: user.isAdmin },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    res.json({ msg: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
