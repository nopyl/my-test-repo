import { Router } from "express";
import { createRole, updateRole, deleteRole, getAllRoles, getRoleById } from "../controllers/role.controller.js";
import { checkRoleExists } from "../middlewares/query/query.middleware.js";
import { getAdminAccess } from "../middlewares/auth/auth.middleware.js";
import passport from "passport";

export const roleRouter = Router();

roleRouter.use([passport.authenticate("jwt", { session: false }), getAdminAccess]);

roleRouter.post("/create", createRole);
roleRouter.patch("/update/:uuid", checkRoleExists, updateRole);
roleRouter.delete("/delete/:uuid", checkRoleExists, deleteRole);
roleRouter.get("/", getAllRoles);
roleRouter.get("/:uuid", checkRoleExists, getRoleById);