import User from "../models/user.models.js";
import jwt from "jsonwebtoken";


const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      // secure: true 
      maxAge: 15 * 60 * 1000
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {registerUser};