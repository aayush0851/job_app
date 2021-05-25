import { ApplicationInterface } from "../interface/application.interface";
import {BaseExporter} from "./base.exporter";
import { CandidateExporter } from "./candidate.exporter";
import { JobExporter } from "./job.exporter";

export class ApplicationExporter extends BaseExporter<ApplicationInterface>{
    protected async _map(application: ApplicationInterface): Promise<any>{
        return {
            _id: application._id,
            application_status: application.application_status,
            applicant: application.applicant,
            // applicant: typeof(application.applicant)!=="string" ? 
            //     await new CandidateExporter().export(application.applicant) : null,
            job_id_applied_for: application.job,
            filed_application_at: application.createdAt
        }
    }
}