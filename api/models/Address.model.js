import { DataTypes } from "sequelize";
import db from "../services/database/service.database.js";

const Address = db.define("Address", {

    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    town: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buildingNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    flatNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userUuid: {
        type: DataTypes.UUID,
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

}, { timestamps: false });

await Address.sync();
export default Address;