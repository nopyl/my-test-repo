import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Message from "./utils/message/message.util.js";
import "./services/database/service.database.js";
import { errorHandler } from "./middlewares/error/error.middleware.js";
import { appRouter } from "./routers/index.router.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import * as jwt from "./authentication/jwt/jwt.authentication.js";
import "./models/index.model.js";

dotenv.config({ path: "./config/config.env" });
const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/api", appRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(Message.ServerIsUp));
