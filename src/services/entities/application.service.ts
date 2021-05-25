import { ApplicationStatus } from "../../enum/application.enum";
import { ApplicationInterface } from "../../interface/application.interface";
import { Application } from "../../models/application.model";
import { jobService } from "./job.service";

class ApplicationService {
    static getInstance(): ApplicationService {
        return new ApplicationService();
    }

    async getApplicationByUserIdAndJobId(userId: string, jobId: string): Promise<ApplicationInterface> {
        return Application.findOne({
            applicant: userId,
            job: jobId
        });
    }

    async listMyApplication(userId: string): Promise<ApplicationInterface[]> {
        return Application.find({
            applicant: userId
        }).populate('job');
    }

    async create(jobId: string, userId: string): Promise<ApplicationInterface> {
        const application = await Application.create({
            job: jobId,
            applicant: userId
        });
        await jobService.addApplicationToJob(jobId, application._id);
        return application;
    }

    async get(applicationId: string): Promise<ApplicationInterface> {
        return Application.findById(applicationId);
    }

    async changeStatus(applicationId: string, status: ApplicationStatus): Promise<ApplicationInterface> {
        return Application.findByIdAndUpdate(applicationId, {
            application_status: status
        })
    }

    async delete(applicationId: string): Promise<any> {
        return Application.findByIdAndDelete(applicationId);
    }
}

export const applicationService = ApplicationService.getInstance();