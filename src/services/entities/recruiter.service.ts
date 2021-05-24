import { Recruiter } from "../../models/recruiter.model";
import { RecruiterInterface } from "../../interface/recruiter.interface";
import moment from "moment";
import { hashSync } from "bcrypt";

class RecruiterService {
    static getInstance(): RecruiterService {
        return new RecruiterService();
    }

    async get(id: string): Promise<RecruiterInterface> {
        return Recruiter.findById(id);
    }

    async create(payload: RecruiterInterface): Promise<RecruiterInterface> {
        return Recruiter.create({
            ...payload,
            password: hashSync(payload.password, 5)
        });
    }

    async getRecruiterByEmail(email: string): Promise<RecruiterInterface> {
        return Recruiter.findOne({
            email: email
        });
    }
}

export const recruiterService = RecruiterService.getInstance();