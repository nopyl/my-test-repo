import { DATE, DataTypes } from "sequelize";
import db from "../services/database/service.database.js";

const Coupon = db.define("Coupon", {

    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    discountRate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    communityLimit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expireDate: {
        type: DataTypes.DATE,
        allowNull: false
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

await Coupon.sync();
export default Coupon;