import { Candidate } from "../../models/candidate.model";
import { CandidateInterface } from "../../interface/candidate.interface";
import moment from "moment";

class CandidateService {
    static getInstance(): CandidateService {
        return new CandidateService();
    }

    async create(payload: CandidateInterface): Promise<any> {
        return Candidate.create(payload);
    }

    async getCandidateByEmail(email: string): Promise<any> {
        return Candidate.findOne({
            email: email
        });
    }

    async candidateEmailNotExists(email: string): Promise<string> {
        const candidate = await this.getCandidateByEmail(email);
        if(candidate){
            throw new Error('Email already in use');
        }
        return email;
    }

    async candidateEmailExists(email: string): Promise<string> {
        const candidate = await this.getCandidateByEmail(email);
        if(!candidate){
            throw new Error('Invalid Email ID');
        }
        return email;
    }
}

export const candidateService = CandidateService.getInstance();