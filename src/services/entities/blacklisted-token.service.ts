import { BlacklistedTokenInterface } from "../../interface/blacklisted-token.interface";
import { BlacklistedToken } from "../../models/blacklisted-token.model";

class BlacklistedTokenService {
    static getInstance(): BlacklistedTokenService {
        return new BlacklistedTokenService();
    }

    async blacklistToken(token: string): Promise<BlacklistedTokenInterface>{
        return BlacklistedToken.create({
            token: token
        });
    }

    async isTokenBlacklisted(authToken: string): Promise<boolean> {
        const token = await BlacklistedToken.findOne({
            token: authToken
        });
        return token ? true : false;
    }
}

export const blacklistedTokenService = BlacklistedTokenService.getInstance();