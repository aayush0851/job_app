import { Request } from "express";
import { AppliedCandidateForJobExporter, JobExporter } from "../exporters/job.exporter";
import { JobInterface } from "../interface/job.interface";
import { jobService } from "../services/entities/job.service";
import { addJobValidator, listJobApplicantValidator } from "../validator/job.validator";
import { baseController } from "./base.controller";

export const addJob = baseController(async (req: Request) => {
    const data = req.body as JobInterface;
    const newJob = await jobService.create(data, req.user._id);
    return new JobExporter().export(newJob);
}, addJobValidator);

export const listAppliedCandidates = baseController(async (req: Request) => {
    const jobId = req.params.job_id;
    const getCandidates = await jobService.getCandidates(jobId);
    return new AppliedCandidateForJobExporter().export(getCandidates);
}, listJobApplicantValidator);