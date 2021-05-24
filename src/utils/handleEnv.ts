import dotenv from "dotenv";

const ENVPATH = ".env";
dotenv.config({path: ENVPATH});

export const ENV_APP_PORT = +process.env.APP_PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URL = process.env.MONGO_URL;