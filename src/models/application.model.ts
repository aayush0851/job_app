import { model, Schema } from 'mongoose';
import {ApplicationInterface} from "../interface/application.interface";
import {ApplicationStatus} from "../enum/application.enum";

const applicationSchema: Schema = new Schema({
    application_status: {
        type: String,
        enum: [ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED, ApplicationStatus.PENDING],
        default: ApplicationStatus.PENDING
    },
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'candidate'
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'job'
    }
}, {
    timestamps: true
});

export const Application = model<ApplicationInterface>('application', applicationSchema);