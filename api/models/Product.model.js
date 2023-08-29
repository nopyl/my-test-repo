import { DataTypes } from "sequelize";
import db from "../services/database/service.database.js";
import slugify from "slugify";
import Brand from "./Brand.model.js";

const Product = db.define("Product", {

    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    brandUuid: {
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
    userUuid: {
        type: DataTypes.UUID,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING
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

Product.addHook("beforeSave", async(product) => {

    if(product.changed("productName")){

        const brand = await Brand.findOne({
            where: {
                uuid: product.brandUuid
            },
            attributes: ["uuid", "brandName"]
        });
        
        product.slug = slugify([brand.brandName, ' ', product.productName].join(''), {
            lower: true,
            replacement: "-",
        });

    }

});

await Product.sync();
export default Product;