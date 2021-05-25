import { ApplicationDataInterface, ApplicationInterface } from "../interface/application.interface";
import {BaseExporter} from "./base.exporter";

export class AddApplicationExporter extends BaseExporter<ApplicationDataInterface> {
    protected async _map(applicationData: ApplicationDataInterface): Promise<any>{
        return {
            message: applicationData.message,
            job_applied_for: {
                _id: applicationData.job._id,
                job_designation: applicationData.job.job_position,
                type: applicationData.job.job_type
            },
            application: {
                _id: applicationData.application._id,
                application_filed_on: applicationData.application.createdAt,
                application_status: applicationData.application.application_status,
                applicant: applicationData.application.applicant,
            }
        }
    }
}

export class ChangeApplicationStatusExporter extends BaseExporter<ApplicationInterface> {
    protected async _map(application: ApplicationInterface): Promise<any>{
        //@ts-ignore
        const { _id, first_name, last_name, portfolio_link, working_experience_yrs, date_of_birth, email, phone_number } = application.applicant;
        return {
            _id: application._id,
            application_status: application.application_status,
            application_filed_on: application.createdAt,
            job_id_applied_to: application.job, 
            applicant: {
                _id: _id,
                name: `${first_name} ${last_name ? last_name : ""}`,
                portfolio: portfolio_link,
                date_of_birth: date_of_birth,
                work_experience: working_experience_yrs,
                email: email,
                phone: phone_number
            }
        }
    }
}

export class ListMyApplicationExporter extends BaseExporter<ApplicationInterface> {
    protected async _map(application: ApplicationInterface): Promise<any>{
        //@ts-ignore
        const {_id, job_position, job_description, job_type, status, no_of_vacancies} = application.job;
        //@ts-ignore
        const {org_id, organization_name, organization_description, email, website, address} = application.job.organization;
        return {
            _id: application._id,
            application_status: application.application_status,
            application_filed_on: application.createdAt,
            job_applied_for: {
                _id: _id,
                designation: job_position,
                description: job_description,
                type: job_type,
                job_opening_status: status ? "OPEN" : "CLOSE",
                vacancies_left: no_of_vacancies,
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
}