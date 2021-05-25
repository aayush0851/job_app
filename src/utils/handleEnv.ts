import dotenv from "dotenv";

const ENVPATH = ".env";
dotenv.config({path: ENVPATH});

export const ENV_APP_PORT = +process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URL = process.env.MONGO_URL;
export const HOST_EMAIL = process.env.NODEMAILER_HOST_EMAIL;
export const HOST_PASSWORD = process.env.NODEMAILER_HOST_PASSWORD;