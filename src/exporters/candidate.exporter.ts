import { CandidateInterface } from "../interface/candidate.interface";
import {BaseExporter} from "./base.exporter";

export class CandidateExporter extends BaseExporter<CandidateInterface>{
    protected _map(candidate: CandidateInterface): any{
        return {
            _id: candidate._id,
            name: `${candidate.first_name} ${candidate.last_name?candidate.last_name:""}`,
            email: candidate.email,
            phone_number: candidate.phone_number,
            working_experience_in_years: candidate.working_experience_yrs,
            portfolio_link: candidate.portfolio_link,
            date_of_birth: candidate.date_of_birth,
        }
    }
}