import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/usersRoute.js";
import reviewRouter from "./routes/reviewsRoute.js";
import commentRouter from "./routes/commentsRoute.js";

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
app.use("/reviews", reviewRouter);
app.use("/comments", commentRouter);

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
