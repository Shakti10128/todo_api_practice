import express from "express";
import { config } from "dotenv";
import { userRoutes } from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { taskRouters } from "./Routes/taskRouters.js";
import cors from "cors";
export const app = express();

config({
  path: "./config.env",
});

// middlwares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// using routers
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRouters);
app.get("/", (req, res) => {
  res.json({
    message: "hiii from express",
  });
});
