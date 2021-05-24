import { Document } from "mongoose";

export interface RecruiterInterface extends Document{
    _id?: string;
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
}