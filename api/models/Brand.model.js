import { DataTypes } from "sequelize";
import db from "../services/database/service.database.js";

const Brand = db.define("Brand", {

    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    brandName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
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

await Brand.sync();
export default Brand;
