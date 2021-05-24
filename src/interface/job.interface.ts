import { Document } from "mongoose";


export interface JobInterface extends Document{
    job_position: string;
    job_description?: string;
    job_type?: string;
    status: boolean;
    no_of_vacancies: number;
}