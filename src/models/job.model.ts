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
        required: false
    },
    status: {
        type: Boolean,
        default: false
    },
    job_type: {
        type: String,
        enum: [JobTypes.FULL_TIME, JobTypes.PART_TIME, JobTypes.INTERNSHIP],
        default: JobTypes.FULL_TIME,
        required: true
    },
    no_of_vacancies: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const Job = model<JobInterface>('job', jobSchema);