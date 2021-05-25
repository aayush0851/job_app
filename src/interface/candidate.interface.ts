import { Document } from "mongoose";
import { UserTypes } from "../enum/user.enum";

export interface CandidateInterface extends Document{
    user_type?: UserTypes
    _id?: string;
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
    date_of_birth: Date;
}