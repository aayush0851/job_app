import { Document } from "mongoose";
import { UserTypes } from "../enum/user.enum";
import { ApplicationInterface } from "./application.interface";

export interface CandidateInterface extends Document{
    user_type?: UserTypes
    _id?: string;
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
    date_of_birth: Date;
    phone_number?: string;
    working_experience_yrs: number;
    portfolio_link: string;
    applications: ApplicationInterface[] | string[];
    createdAt?: Date;
}