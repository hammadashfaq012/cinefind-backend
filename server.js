import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import showRoutes from "./routes/showRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/shows", showRoutes);

app.get("/", (req, res) => {
  res.json({ message: "CineFind backend is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
