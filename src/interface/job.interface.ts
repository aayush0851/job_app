import { Document } from "mongoose";
import { JobTypes } from "../enum/job.enum";
import { ApplicationInterface } from "./application.interface";
import { RecruiterInterface } from "./recruiter.interface";

export interface JobInterface extends Document{
    job_position: string;
    job_description: string;
    job_type?: JobTypes;
    status: boolean;
    no_of_vacancies: number;
    organization?: RecruiterInterface;
    applications?: ApplicationInterface[] |string[];
    createdAt?: Date;
}