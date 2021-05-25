import { ApplicationInterface } from "../interface/application.interface";
import { JobInterface } from "../interface/job.interface";
import { BaseExporter } from "./base.exporter";

class DumbExporter extends BaseExporter<ApplicationInterface>{
    protected async _map(application: ApplicationInterface): Promise<any>{
        //@ts-ignore
        const {application_status, createdAt} = application;
        //@ts-ignore
        const { _id, first_name, last_name, portfolio_link, working_experience_yrs, date_of_birth, email, phone_number } = application.applicant;
        return {
            candidate_id: _id,
            name: `${first_name} ${last_name ? last_name : ""}`,
            portfolio: portfolio_link,
            date_of_birth: date_of_birth,
            work_experience: working_experience_yrs,
            email: email,
            phone: phone_number,
            candidates_application: {
                _id: application._id,
                application_status: application_status,
                application_filed_on: createdAt,
            }
        }
    }
}

export class AppliedCandidateForJobExporter extends BaseExporter<JobInterface>{
    protected async _map(job: JobInterface): Promise<any>{
        return {
            job_id: job._id,
            position_offered: job.job_position,
            status: job.status,
            vacancies_left: job.no_of_vacancies,
            //@ts-ignore
            candidate: await new DumbExporter().exportList(job.applications)
        }
    }
}

export class JobExporter extends BaseExporter<JobInterface>{
    protected async _map(job: JobInterface): Promise<any>{
        //@ts-ignore
        const {org_id, organization_name, organization_description, email, website, address} = job.organization;
        return {
            _id: job._id,
            job_designation: job.job_position,
            description_of_job: job.job_description,
            status: job.status ? "OPEN" : "CLOSED",
            type: job.job_type,
            number_of_available_vacancies: job.no_of_vacancies,
            organization: {
                _id: org_id,
                name: organization_name,
                organization_description: organization_description,
                contact: {
                    email: email,
                    website: website,
                    address: address
                }
            }
        }
    }
}

