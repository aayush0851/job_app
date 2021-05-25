import { string } from "joi";
import { JobInterface } from "../interface/job.interface";
import { ApplicationExporter } from "./application.exporter";
import {BaseExporter} from "./base.exporter";
import { CandidateExporter } from "./candidate.exporter";
import { RecruiterExporter } from "./recruiter.exporter";

export class JobExporter extends BaseExporter<JobInterface>{
    protected async _map(job: JobInterface): Promise<any>{
        return {
            _id: job._id,
            job_designation: job.job_position,
            description_of_job: job.job_description,
            status: job.status ? "OPEN" : "CLOSED",
            type: job.job_type,
            number_of_available_vacancies: job.no_of_vacancies,
            recruiting_organization: await new RecruiterExporter().export(job.organization),
            //@ts-ignore
            applicable_candidates: typeof(job.applications[0])!=="string" ? await new ApplicationExporter().exportList(job.applications) : null
        }
    }
}