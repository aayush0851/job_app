import { model, Schema } from 'mongoose';
import { BlacklistedTokenInterface } from '../interface/blacklisted-token.interface';

const blacklistedTokenSchema: Schema = new Schema({
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const BlacklistedToken = model<BlacklistedTokenInterface>('blacklistedToken', blacklistedTokenSchema);