import express from "express";
import { login, signup } from "../controller/candidate.controller";

export const candidateRouter = express.Router();

candidateRouter.post("/signup", signup);
candidateRouter.post("/login", login);