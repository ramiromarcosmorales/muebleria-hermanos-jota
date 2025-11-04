import express from "express";
import registerUser from "../controllers/userController";

export const authenticationRouter = express.Router();

authenticationRouter.post("/registro", registerUser);
