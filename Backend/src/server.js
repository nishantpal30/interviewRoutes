import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { serverConfig } from "./config/server.config.ts";
import { connectDB } from "./config/db.config.ts";
import authRouter from "./routers/auth.routers.js";
import problemRouter from "./routers/problem.routers.js";

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter);
app.use("/api/problem", problemRouter);

const startServer = async () => {
  // connectDB exits the process on failure, so the server only starts
  // accepting requests once the database is connected.
  await connectDB();

  app.listen(serverConfig.PORT, () => {
    console.log(`Server Running Successfully at PORT ${serverConfig.PORT}`);
  });
};

startServer();
