import { Sequelize } from "sequelize";
import Message from "../../utils/message/util.message.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env"});

const {DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_DIALECT} = process.env;

const database = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
});

try {
  await database.authenticate();
  console.log(Message.DatabaseConnectionSuccess);
} catch (err) {
  console.log(err);
}

export default database;