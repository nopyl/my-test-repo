import { Router } from "express";
import { createRole, updateRole } from "../controllers/role.controller.js";
import { checkRoleExists } from "../middlewares/query/query.middleware.js";

//Admin access will be added.
export const roleRouter = Router();

roleRouter.post("/create", createRole);
roleRouter.patch("/update/:uuid", checkRoleExists, updateRole);