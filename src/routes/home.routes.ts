import express from "express";
import { listOpenJobs } from "../controller/home.controller";

export const homeRouter = express.Router();

homeRouter.get("/", listOpenJobs);