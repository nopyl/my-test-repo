import User from "./User.model.js";
import Role from "./Role.model.js";
import db from "../services/database/service.database.js";

User.belongsToMany(Role, { through: "UserRoles"} );
Role.belongsToMany(User, { through: "UserRoles"} );


await db.sync();
export {
    User,
    Role
};