import usersModel from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
