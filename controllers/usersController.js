import usersModel from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateUserToken = (userId) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return null;
    }

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if ((!userName, !email, !password)) {
      res.status(400).json({ message: "Please fill all required fields" });
    }

    const isAlreadyRegister = await usersModel.findOne({ email });
    if (isAlreadyRegister) {
      res
        .status(400)
        .json({ message: "User with this email is already registered" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new usersModel({
        userName,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return res.status(201).json({
        message: "Successfully Registerd",
        newUser,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please fill all required fields" });
    } else {
      const user = await usersModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password incorrect" });
      }

      const token = generateUserToken(usersModel._id);

      return res
        .status(200)
        .json({
          message: "Login Successful",
          token: token,
          user: { id: user._id, name: user.userName, email: user.email },
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
