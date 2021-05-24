import { model, Schema } from 'mongoose';
import { CandidateInterface } from '../interface/candidate.interface';

const candidateSchema: Schema = new Schema({
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
    },
    date_of_birth: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

export const Candidate = model<CandidateInterface>('candidate', candidateSchema);