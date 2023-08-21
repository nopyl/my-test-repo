import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import Message from "./utils/message/util.message.js";

dotenv.config({path: "/config/config.env"});
const app = express();

app.use(cors());


app.listen(process.env.PORT, () => console.log(Message.ServerIsUp));