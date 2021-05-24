import { model, Schema } from 'mongoose';
import { CandidateInterface } from '../interface/candidate.interface';

const candidateSchema: Schema = new Schema<CandidateInterface>({
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
    phone_number: {
        type: String,
        required: false,
        min: 10,
        max: 13
    },
    working_experience_yrs: {
        type: Number,
        required: true
    },
    portfolio_link: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'application'
    }]
}, {
    timestamps: true
});

export const Candidate = model<CandidateInterface>('candidate', candidateSchema);