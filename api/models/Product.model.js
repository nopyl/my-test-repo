import { DataTypes } from "sequelize";
import db from "../services/database/service.database.js";

const Product = db.define("Product", {

    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    brandId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    quantityInStock: {
        type: DataTypes.INTEGER,
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


}, { timestamps: false });

await Product.sync();
export default Product;