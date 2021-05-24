import { Candidate } from "../../models/candidate.model";
import { CandidateInterface } from "../../interface/candidate.interface";
import { hashSync } from "bcrypt";

class CandidateService {
    static getInstance(): CandidateService {
        return new CandidateService();
    }

    async get(id: string): Promise<CandidateInterface> {
        return Candidate.findById(id);
    }

    async create(payload: CandidateInterface): Promise<CandidateInterface> {
        return Candidate.create({
            ...payload,
            password: hashSync(payload.password, 5)
        });
    }

    async getCandidateByEmail(email: string): Promise<CandidateInterface> {
        return Candidate.findOne({
            email: email
        });
    }
}

export const candidateService = CandidateService.getInstance();