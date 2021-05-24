import { CandidateInterface } from "../../interface/candidate.interface";
import { RecruiterInterface } from "../../interface/recruiter.interface";

declare module 'express-serve-static-core' {
    interface Request {
        user?: CandidateInterface | RecruiterInterface
    }
}