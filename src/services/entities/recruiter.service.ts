import { Recruiter } from "../../models/recruiter.model";
import { RecruiterInterface } from "../../interface/recruiter.interface";
import moment from "moment";

class RecruiterService {
    static getInstance(): RecruiterService {
        return new RecruiterService();
    }

    async create(payload: RecruiterInterface): Promise<any> {
        return Recruiter.create({
            ...payload,
            created_at: moment.utc(),
            updated_at: moment.utc()
        });
    }

    async getRecruiterByEmail(email: string): Promise<any> {
        return Recruiter.findOne({
            email: email
        });
    }

    async recruiterEmailNotExists(email: string): Promise<string> {
        const recruiter = await this.getRecruiterByEmail(email);
        if(recruiter){
            throw new Error('Email already in use');
        }
        return email;
    }

    async recruiterEmailExists(email: string): Promise<string> {
        const recruiter = await this.getRecruiterByEmail(email);
        if(!recruiter){
            throw new Error('Invalid Email ID');
        }
        return email;
    }
}

export const recruiterService = RecruiterService.getInstance();