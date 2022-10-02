import { useState } from 'react';
import { useAsyncStorage } from '../util/async-storage';

export function useUserToken({ defaultValue }: { defaultValue: string | null }) {
    const { removeItem: purgeUserToken, setItem: saveUserToken } = useAsyncStorage('@user-token');
    const { removeItem: purgeRefreshToken, setItem: saveRefreshToken } = useAsyncStorage('@refresh-token');
    const [userToken, setUserToken] = useState(defaultValue);

    return {
        userToken,
        updateUserToken(token: string) {
            setUserToken(token);
            saveUserToken(token);
        },
        eraseUserToken() {
            purgeUserToken().then(() => setUserToken(null));
        },
        updateRefreshToken(refreshToken: string) {
            saveRefreshToken(refreshToken);
        },
        eraseRefreshToken() {
            purgeRefreshToken();
        }
    };
}