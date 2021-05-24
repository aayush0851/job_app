import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { addApplication } from "../controller/application.controller";

export const applicationRouter = express.Router();

// applicationRouter.post("/", [authMiddleware], addApplication);