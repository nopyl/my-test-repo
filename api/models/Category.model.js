import { DataTypes } from "sequelize";
import db from "../services/database/service.database.js";

const Category = db.define("Category", {

    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userUuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

}, {timestamps: false});


await Category.sync();
export default Category;