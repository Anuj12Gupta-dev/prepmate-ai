import { verifyToken } from "@clerk/backend";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // 1. Read Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    // 3. Verify token with Clerk
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    // payload contains: userId, sid, email, etc.
    const clerkId = payload.sub; // Clerk userId is stored in `sub`

    if (!clerkId) {
      return res.status(401).json({ message: "Invalid token - no clerkId" });
    }

    // 4. Fetch user from DB
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 5. Attach user + clerk info to request
    req.user = user;
    req.auth = payload;

    next();
  } catch (err) {
    console.error("protectRoute token verification failed:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
