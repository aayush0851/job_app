import { CandidateInterface } from "../../interface/candidate.interface";
import { JobInterface } from "../../interface/job.interface";
import { Candidate } from "../../models/candidate.model";
import { Job } from "../../models/job.model";
import { HttpException } from "../../utils/exception";

class JobService {
    static getInstance(): JobService {
        return new JobService();
    }

    async getAllOpenJobs(): Promise<JobInterface[]> {
        return Job.find({
            status: true
        });
    }

    async create(payload: JobInterface, userId: string): Promise<JobInterface> {
        const job = await Job.create({
            ...payload,
            organization: userId
        });
        return this.get(job._id);
    }

    async addApplicationToJob(jobId: string, applicationId: string): Promise<JobInterface> {
        return Job.findByIdAndUpdate(jobId, {
            $push: {
                applications: applicationId
            }
        });
    }

    async get(id: string): Promise<JobInterface> {
        return Job.findById(id).populate('organization');
    }

    async getCandidates(jobId: string): Promise<JobInterface> {
        return Job.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: 'applicant'
            }
        })
    }

    async handleVacancies(jobId: string): Promise<JobInterface> {
        const flag = -1;
        let job = await Job.findByIdAndUpdate(jobId, {
            $inc: {
                no_of_vacancies: flag
            }
        });
        if(job.no_of_vacancies <= 1 ){
            job = await job.updateOne({
                status: false
            })
        }
        return job;
    }
}

export const jobService = JobService.getInstance();