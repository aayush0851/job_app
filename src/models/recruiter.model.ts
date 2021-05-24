import { model, Schema } from 'mongoose';
import { RecruiterInterface } from '../interface/recruiter.interface';

const recruiterSchema: Schema = new Schema({
    organization_name: {
        type: String,
        required: true,
        min: 2
    },
    organization_description: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export const Recruiter = model<RecruiterInterface>('recruiter', recruiterSchema);