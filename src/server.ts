import {Application}from "./app";
import { ENV_APP_PORT } from "./utils/handleEnv";

const app = new Application(ENV_APP_PORT);

app.start();