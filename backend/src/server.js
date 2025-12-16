import express from "express";
import cors from "cors";
import { serve } from "inngest/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: ENV.CLIENT_URL,  // your Vercel domain
    credentials: false,       // IMPORTANT → no cookies anymore
  })
);

// REMOVE THIS — cookie-based auth
// app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server running:", ENV.PORT));
  } catch (error) {
    console.error("Error starting the server", error);
  }
};

startServer();
