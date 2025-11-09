import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.route.js";
import AdminAuth from "./routes/admin.auth.route.js";
import connectDB from "./database/db.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ quiet: true });

const app = express();

// ✅ Fix for ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/user", AuthRoute);
app.use("/admin", AdminAuth);

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// ✅ This catches all other routes and serves React index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});

// Database + Server
connectDB().then(() => {
  app.listen(5000, () => console.log(`🚀 Server running on port 5000 ✅`));
});
