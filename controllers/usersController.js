import usersModel from "../models/usersModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/auth.js";

// const generateUserToken = (userId) => {
//   try {
//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is not defined in environment variables");
//       return null;
//     }

//     if (!userId) {
//       throw new Error("userId is missing");
//     }

//     const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     return token;
//   } catch (error) {
//     console.error("Error generating token:", error);
//     return null;
//   }
// };

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      res.status(400).json({ message: "Please fill all required fields" });
    }

    const isAlreadyRegister = await usersModel.findOne({ email });
    if (isAlreadyRegister) {
      res.status(400).json({
        message: "User with this email is already registered",
        status: 400,
        data: null,
      });
    } else {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = new usersModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
      });

      await newUser.save();

      return res.status(201).json({
        message: "Successfully Registerd",
        status: 201,
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Silakan isi semua kolom yang diperlukan.",
      });
    } else {
      const user = await usersModel.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ status: 400, message: "Email atau kata sandi salah." });
      } else {
        const validateUser = await bcryptjs.compare(password, user.password);
        if (!validateUser) {
          res
            .status(400)
            .json({ status: 400, message: "Email atau kata sandi salah." });
        } else {
          const payload = {
            userId: user._id,
            email: user.email,
          };
          const JWT_SECRET = process.env.JWT_SECRET;

          jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: "1d" },
            async (err, token) => {
              if (err) {
                return res.status(500).json(err);
              }
              await user.save();

              return res.status(200).json({
                status: 200,
                data: user,
                token: token,
                message: "Login Succesfully",
              });
            }
          );
        }
      }
    }
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({
      status: 500,
      message: "Kesalahan server internal",
    });
  }
};

export const getProfile = [
  verifyToken,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const userData = await usersModel.findById(userId);
      if (userData == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      return res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
