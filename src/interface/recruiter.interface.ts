import { Document } from "mongoose";
import { UserTypes } from "../enum/user.enum";

export interface RecruiterInterface extends Document{
    user_type?: UserTypes
    _id?: string;
    organization_name: string;
    organization_description?: string;
    address?: string;
    website: string;
    email: string;
    password: string;
}