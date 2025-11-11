import express from "express";
import register from "../controllers/userController.js";
import { login } from "../controllers/userController.js";

export const authenticationRouter = express.Router();

authenticationRouter.post("/registro", register);

authenticationRouter.post("/login", login);
