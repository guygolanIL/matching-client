import { Buffer } from 'buffer';

type JwtPayload = {
    email: string,
    iat: number,
    exp: number
};

function extractPayload(jwt: string): JwtPayload | undefined {
    try {
        const payloadSection = jwt.split('.')[1];
        const payload = JSON.parse(Buffer.from(payloadSection, "base64").toString()) as JwtPayload;
        return payload;
    } catch (error) {
        console.log(error);
        console.error('malformed jwt');
    }
}

export const jwt = {
    validateExpiration(jwt: string): boolean {
        const payload = extractPayload(jwt);
        if (!payload) return false;

        return Date.now() < payload.exp * 1000;
    }
}