import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Message from "./utils/message/message.util.js";
import "./services/database/service.database.js";
import { errorHandler } from "./middlewares/error/error.middleware.js";
import { appRouter } from "./routers/index.router.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./config/config.env" });
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", appRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(Message.ServerIsUp));
