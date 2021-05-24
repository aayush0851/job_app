import { ApplicationInterface } from "../../interface/application.interface";
import { Application } from "../../models/application.model";

class ApplicationService {
    static getInstance(): ApplicationService {
        return new ApplicationService();
    }

    async create(jobId: string, userId: string): Promise<ApplicationInterface> {
        return Application.create({
            organization: jobId,
            applicant: userId
        })
    }

    async get(applicationId: string): Promise<ApplicationInterface> {
        return Application.findById(applicationId);
    }
}

export const applicationService = ApplicationService.getInstance();