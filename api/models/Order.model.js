import { DataTypes } from "sequelize";
import db from "../services/database/service.database.js";

const Order = db.define("Order", {

    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    status: {
        type: DataTypes.ENUM(
            "OrderReceived",
            "OrderPreparing", 
            "OrderCanceled",
            "OrderDelivered", 
        ),
        defaultValue: "OrderReceived"
    },
    userUuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    couponUuid: {
        type: DataTypes.UUID,
        allowNull: true
    },
    addressUuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    creditCardUuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

}, {timestamps: false});

await Order.sync();
export default Order;