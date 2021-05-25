import { Document } from "mongoose";
import { ApplicationStatus } from "../enum/application.enum";

export interface ApplicationInterface extends Document{
    application_status: ApplicationStatus,
    job: string;
    applicant: string;
}