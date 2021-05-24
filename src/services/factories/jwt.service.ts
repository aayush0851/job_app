import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/handleEnv";

class JwtService {
    static getInstance(): JwtService {
        return new JwtService();
    }

    async createToken(userId: string): Promise<string> {
        return jwt.sign(userId, JWT_SECRET, {
            expiresIn: "4h"
        });
    }

    async parseToken(token: string): Promise<any> {
        return jwt.decode(token);
    }
}

export const jwtService = JwtService.getInstance();