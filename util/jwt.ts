import { Buffer } from 'buffer';

type JwtPayload = {
    email: string,
    iat: number,
    exp: number
};


export const jwt = {
    validateExpiration(jwt: string): boolean {
        const payload = this.extractPayload(jwt);
        if (!payload) return false;

        return Date.now() < payload.exp * 1000;
    },
    extractPayload(jwt: string | null): JwtPayload | undefined {
        if (!jwt) return;
        try {
            const payloadSection = jwt.split('.')[1];
            const payload = JSON.parse(Buffer.from(payloadSection, "base64").toString()) as JwtPayload;
            return payload;
        } catch (error) {
            console.log(error);
            console.error('malformed jwt');
        }
    },
}