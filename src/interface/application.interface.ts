import { Document } from "mongoose";
import { ApplicationStatus } from "../enum/application.enum";
import { CandidateInterface } from "./candidate.interface";
import { JobInterface } from "./job.interface";


export interface ApplicationInterface extends Document{
    _id?: string;
    application_status: ApplicationStatus,
    job: string;
    applicant?: CandidateInterface | string;
    createdAt?: Date;
}


export interface ApplicationDataInterface{
    message?: string;
    application?: ApplicationInterface;
    job?: JobInterface;
}