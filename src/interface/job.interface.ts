import { Document } from "mongoose";
import { JobTypes } from "../enum/job.enum";

export interface JobInterface extends Document{
    job_position: string;
    job_description: string;
    job_type?: JobTypes;
    status: boolean;
    no_of_vacancies: number;
}