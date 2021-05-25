import { connect } from "mongoose";
import { MONGO_URL } from "../../utils/handleEnv";

class DatabaseService{

    static getInstance(): DatabaseService{
        return new DatabaseService();
    }

    constructor() {
        connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("db service is live")
    }
}

export const databaseService = DatabaseService.getInstance();