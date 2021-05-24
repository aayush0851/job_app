import { model, Schema } from 'mongoose';
import { RecruiterInterface } from '../interface/recruiter.interface';

const recruiterSchema: Schema = new Schema({
    first_name: {
        type: String,
        required: true,
        min: 3
    },
    last_name: {
        type: String,
        required: false,
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