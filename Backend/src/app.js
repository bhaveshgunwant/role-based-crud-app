import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));



app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;