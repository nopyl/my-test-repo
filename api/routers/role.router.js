import { Router } from "express";
import { createRole } from "../controllers/role.controller.js";

//Admin access will be added.
export const roleRouter = Router();

roleRouter.post("/create", createRole);