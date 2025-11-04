import express from "express";
import registerUser from "../service/authenticationService";

export const authenticationRouter = express.Router();

authenticationRouter.post("/registro", registerUser);
