import { RecruiterInterface } from "../interface/recruiter.interface";
import {BaseExporter} from "./base.exporter";

export class RecruiterExporter extends BaseExporter<RecruiterInterface>{
    protected _map(recruiter: RecruiterInterface): any{
        return {
            _id: recruiter._id,
            organization_name: recruiter.organization_name,
            organization_description: recruiter.organization_description,
            address: recruiter.address,
            website: recruiter.website,
            email: recruiter.email,            
        }
    }
}