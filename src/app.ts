import express from 'express';
import bodyParser from "body-parser";
import { ENV_APP_PORT } from './utils/handleEnv';
import { baseRouter } from './routes/base.routes';
import { databaseService } from './services/factories/db.service';

export class Application {
    private readonly APP: express.Application;
    private readonly PORT: number;

    constructor(port: number){
        this.APP = express();
        this.PORT = port;
        this.fireGlobalMiddlewares();
        this.initialiseRoutes();
    }

    private fireGlobalMiddlewares(): void {
        //use cors and other global middlewares here
        this.APP.use(bodyParser.json({limit: "30mb"}));
        this.APP.use(bodyParser.urlencoded({extended: true, limit: "30mb"}));
    }

    private initialiseRoutes():void {
        this.APP.use(baseRouter);
    }


    start(): void {
        databaseService;
        this.APP.listen(this.PORT, () => {
            console.log("App: online at port " + ENV_APP_PORT);
        });
    }

}