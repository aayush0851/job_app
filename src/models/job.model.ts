import { Model, model, Schema } from 'mongoose';
import { JobTypes } from "../enum/job.enum";
import { JobInterface } from "../interface/job.interface";


const jobSchema: Schema = new Schema({
    job_position: {
        type: String,
        required: true
    },
    job_description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    job_type: {
        type: String,
        enum: [JobTypes.FULL_TIME, JobTypes.PART_TIME, JobTypes.INTERNSHIP],
        default: JobTypes.FULL_TIME
    },
    no_of_vacancies: {
        type: Number,
        required: true
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'recruiter'
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'application'
    }]
}, {
    timestamps: true
});

export const Job = model<JobInterface>('job', jobSchema);