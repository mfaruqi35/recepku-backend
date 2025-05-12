import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/usersRoute.js";

configDotenv();

const app = express();
const PORT = 3003;

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
