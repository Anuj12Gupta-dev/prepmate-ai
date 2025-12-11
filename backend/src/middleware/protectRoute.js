import { verifyToken } from "@clerk/backend";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing Authorization header" });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    const clerkId = payload.sub; // Clerk stores userId in sub

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    req.auth = payload;
    next();
  } catch (err) {
    console.error("protectRoute error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
