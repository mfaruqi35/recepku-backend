import jwt from "jsonwebtoken";
import usersModel from "../models/usersModel.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usersModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ status: 401, message: "User not found" });
    }
    req.user = user; // Simpan payload ke dalam `req.user` untuk digunakan di fungsi lain
    next();
  } catch (error) {
    res.status(403).json({
      status: 403,
      message: "Invalid or expired token.",
    });
  }
};
