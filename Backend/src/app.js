import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
  origin:[
    "https://role-based-crud-app-eight.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));



app.get("/", (req, res) => {
  res.json({ message: `API is running...  Refer to github: https://github.com/bhaveshgunwant/role-based-crud-app` });
});


app.use("/api/v1/auth",  authRoutes);
app.use("/api/v1/tasks", taskRoutes);

export default app;