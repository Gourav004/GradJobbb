import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.route.js";
import AdminAuth from "./routes/admin.auth.route.js";
import connectDB from "./database/db.js";

dotenv.config({ quiet: true });

// ✅ Step 1: Create app first
const app = express();

// ✅ Step 2: Middlewares in correct order
app.use(cookieParser()); // read cookies first
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true, // allow cookies
  })
);
app.use(express.json()); // parse JSON body

// ✅ Step 3: Global request logger (optional)
app.use((req, res, next) => {
  console.log("➡️ Incoming request:", req.method, req.url);
  next();
});

// ✅ Step 4: Routes
app.use("/user", AuthRoute);
app.use("/admin", AdminAuth);

// ✅ Step 5: Connect to DB and start server
connectDB().then(() => {
  app.listen(5000, () => console.log(`🚀 Server running on port 5000 ✅`));
});
