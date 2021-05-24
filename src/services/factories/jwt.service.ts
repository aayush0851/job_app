import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/handleEnv";

class JwtService {
    static getInstance(): JwtService {
        return new JwtService();
    }

    async createToken(userId: string): Promise<string> {
        return jwt.sign({_id: userId}, JWT_SECRET, {
            expiresIn: "4h"
        });
    }

    parseToken(token: string) {
        return jwt.decode(token);
    }
}

export const jwtService = JwtService.getInstance();