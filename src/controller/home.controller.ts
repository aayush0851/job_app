import { blacklistedTokenService } from "../services/entities/blacklisted-token.service";
import { jobService } from "../services/entities/job.service";
import { baseController } from "./base.controller";

export const logout = baseController(async (req: Request) => {
    //@ts-ignore
    const authToken = req.headers.authorization;
    await blacklistedTokenService.blacklistToken(authToken);
    return {
        message: "You have been successfully logged out"
    }
});

export const listOpenJobs = baseController(async (req: Request) => {
    const jobs = await jobService.getAllOpenJobs();
    return jobs;
});