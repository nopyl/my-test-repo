import db from "../services/database/service.database.js";
import User from "./User.model.js";
import Role from "./Role.model.js";
import Brand from "./Brand.model.js";
import Product from "./Product.model.js";
import Color from "./Color.model.js";
import Category from "./Category.model.js";
import Review from "./Review.model.js";
import Coupon from "./Coupon.model.js";
import Address from "./Address.model.js";
import CreditCard from "./CreditCard.model.js";
import Order from "./Order.model.js";


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

//Review & User -> One to Many
User.hasMany(Review, {foreignKey: "userUuid"});
Review.belongsTo(User);

//Review & Product -> Many to Many
Product.belongsToMany(Review, { through: "ProductReviews" });
Review.belongsToMany(Product, { through: "ProductReviews" });

//Coupon & Category -> Many to Many
Coupon.belongsToMany(Category, { through: "CouponCategories"});
Category.belongsToMany(Coupon, { through: "CouponCategories"});

//Address & User -> One to Many
User.hasMany(Address, {foreignKey: "userUuid"});
Address.belongsTo(User);

//Credit Card & User -> One to Many
User.hasMany(CreditCard, {foreignKey: "userUuid"});
CreditCard.belongsTo(User);

//Order & Product -> Many to Many
Product.belongsToMany(Order, {through: "OrderProducts"});
Order.belongsToMany(Product, {through: "OrderProducts"});

//Order & User -> One to Many
User.hasMany(Order, { foreignKey: "userUuid"});
Order.belongsTo(User);

//Order & Coupon -> One to Many
Coupon.hasMany(Order, { foreignKey: "couponUuid"});
Order.belongsTo(Coupon);

//Order & Address -> One to Many
Address.hasMany(Order, { foreignKey: "addressUuid"});
Order.belongsTo(Address);

await db.sync();
export {
    User,
    Role,
    Product,
    Brand,
    Color,
    Category,
    Review,
    Coupon,
    Address,
    CreditCard,
    Order
};