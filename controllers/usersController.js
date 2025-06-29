import usersModel from "../models/usersModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/auth.js";
import cloudinary, { uploadToCloudinary } from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
  try {
    const { email, phoneNumber, userName, password } = req.body;
    if (!email || !phoneNumber || !userName || !password) {
      res.status(400).json({ message: "Please fill all required fields" });
    }

    const isAlreadyRegister = await usersModel.findOne({
      $or: [{ email }, { userName }],
    });
    if (isAlreadyRegister) {
      res.status(400).json({
        message: "UserName or email is taken",
        status: 400,
        data: null,
      });
    } else {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = new usersModel({
        email,
        phoneNumber,
        userName,
        password: hashedPassword,
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
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({
        status: 400,
        message: "Silakan isi semua kolom yang diperlukan.",
      });
    } else {
      const user = await usersModel.findOne({
        $or: [{ email: login }, { userName: login }],
      });
      if (!user) {
        return res.status(400).json({
          status: 400,
          message: "Email/username atau kata sandi salah.",
        });
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
                message: "Login Succesfully",
                status: 200,
                data: user,
                token: token,
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

export const editProfile = [
  verifyToken,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await usersModel.findById(userId);
      const { userName, firstName, lastName, email, phoneNumber } = req.body;
      const file = req.files?.["profilePic"]?.[0];
      if (!user) {
        return res
          .status(404)
          .json({ message: "Cannot find user", status: 404, data: null });
      }

      if (userName) user.userName = userName;
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;

      if (file) {
        if (user.profilePicAlias) {
          await cloudinary.uploader.destroy(`profiles/${user.profilePicAlias}`);
        }

        const alias = `profile-${(firstName || user.firstName || "user")
          .toLowerCase()
          .replace(/\s+/g, "-")}-${Date.now()}`;

        const uploadResult = await uploadToCloudinary(
          file.buffer,
          "profiles",
          alias
        );
        user.profilePic = uploadResult.secure_url;
        user.profilePicAlias = uploadResult.public_id;
      }

      await user.save();
      return res.status(200).json({
        message: "Profile is successfully updated",
        status: 200,
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const saveRecipe = [
  verifyToken,
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const { recipeId } = req.params;

      const user = await usersModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const alreadySaved = user.savedRecipes.includes(recipeId);

      if (alreadySaved) {
        user.savedRecipes = user.savedRecipes.filter(
          (id) => id.toString() !== recipeId
        );
      } else {
        user.savedRecipes.push(recipeId);
      }
      await user.save();

      return res.status(200).json({
        message: alreadySaved ? "Recipe unsaved" : "Recipe saved",
        data: user.savedRecipes,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
];

export const getSavedRecipes = [
  verifyToken,
  async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await usersModel.findById(userId).populate("savedRecipes");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "Saved recipes fetched",
        data: user.savedRecipes,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
];
