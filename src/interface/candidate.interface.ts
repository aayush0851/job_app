import { Document } from "mongoose";

export interface CandidateInterface extends Document{
    _id?: string;
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
    date_of_birth: Date;
}