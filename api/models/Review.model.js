import { DataTypes } from "sequelize";
import db from "../services/database/service.database.js";
import Message from "../utils/message/message.util.js";

const Review = db.define("Review", {

    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    starCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: Message.ReviewStarValidationError
            },
            max: {
                args: 5,
                msg: Message.ReviewStarValidationError
            }
        }
    },
    message: {
        type: DataTypes.STRING,
    },
    productUuid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userUuid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

}, {timestamps: false});

await Review.sync();
export default Review;