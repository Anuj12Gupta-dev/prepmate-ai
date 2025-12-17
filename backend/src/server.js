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

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      // Server started successfully
      console.log(`Server started on port ${ENV.PORT}`);
    });
  } catch (error) {
    // Error handling for server startup
    console.log(error)
  }
};

startServer();
