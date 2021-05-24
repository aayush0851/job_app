import express from "express";
import { login, signup } from "../controller/recruiter/recruiter.controller";

export const recruiterRouter = express.Router();

recruiterRouter.post("/signup", signup);
recruiterRouter.post("/login", login);