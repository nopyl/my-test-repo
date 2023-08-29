import db from "../services/database/service.database.js";
import User from "./User.model.js";
import Role from "./Role.model.js";
import Brand from "./Brand.model.js";
import Product from "./Product.model.js";
import Color from "./Color.model.js";
import Category from "./Category.model.js";


//User & Role -> Many to Many
User.belongsToMany(Role, { through: "UserRoles"} );
Role.belongsToMany(User, { through: "UserRoles"} );

//Brand & Product -> One to Many
Brand.hasMany(Product, { foreignKey: "brandUuid" });
Product.belongsTo(Brand);

//Brand & User -> One to Many
User.hasMany(Brand, { foreignKey: "userUuid" });
Brand.belongsTo(User);

//Color & User -> One to Many
User.hasMany(Color, { foreignKey: "userUuid" });
Color.belongsTo(User);

//Color & Product -> Many to Many
Product.belongsToMany(Color, { through: "ProductColors" });
Color.belongsToMany(Product, { through: "ProductColors" });

//Category & User -> One to Many
User.hasMany(Category, { foreignKey: "userUuid"});
Category.belongsTo(User);

await db.sync();
export {
    User,
    Role,
    Product,
    Brand,
    Color,
    Category
};