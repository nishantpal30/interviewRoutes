import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { serverConfig } from "./config/server.config.ts";
import { connectDB } from "./config/db.config.ts";
import authRouter from "./routers/auth.routers.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth",authRouter);


// middleware
app.listen(serverConfig.PORT, async ()=>{

 console.log(`Server Running Sucessfully at PORT ${serverConfig.PORT}`);
 connectDB();
});
