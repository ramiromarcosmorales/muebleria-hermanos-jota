import express from "express";
import {
  register,
  login,
  verifySession,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";

export const authenticationRouter = express.Router();

authenticationRouter.post("/registro", register);

authenticationRouter.post("/login", login);

authenticationRouter.get("/verify", verifyToken, verifySession);
