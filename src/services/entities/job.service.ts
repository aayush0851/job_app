import { CandidateInterface } from "../../interface/candidate.interface";
import { JobInterface } from "../../interface/job.interface";
import { Candidate } from "../../models/candidate.model";
import { Job } from "../../models/job.model";

class JobService {
    static getInstance(): JobService {
        return new JobService();
    }

    async create(payload: JobInterface, userId: string): Promise<JobInterface> {
        return Job.create({
            ...payload,
            organization: userId
        });
    }

    async get(id: string): Promise<JobInterface> {
        return Job.findById(id);
    }

    async getCandidates(jobId: string): Promise<any> {
        return Job.findById(jobId).populate('application')
    }
}

export const jobService = JobService.getInstance();