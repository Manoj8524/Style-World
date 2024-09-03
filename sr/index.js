// index.js
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./Routes/userRoutes.js"; // Ensure this path is correct
import connectionDB from "./Connection/Conn.js"; // Ensure this path is correct

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors({
  origin: ["https://style-world-omega.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

connectionDB();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/", (req, res) => res.send("Server is ready"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
