import express from "express";
import { listMyApplications, login, signup } from "../controller/candidate.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { candidateMiddleware } from "../middleware/candidate.middleware";

export const candidateRouter = express.Router();

candidateRouter.post("/signup", signup);
candidateRouter.post("/login", login);

candidateRouter.get("/my-applications", [authMiddleware, candidateMiddleware], listMyApplications);