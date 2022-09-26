import { useState } from 'react';
import { useAsyncStorage } from '../util/async-storage';

export function useUserToken({ defaultValue }: { defaultValue: string | null }) {
    const { removeItem, setItem } = useAsyncStorage('@user-token');
    const [userToken, setUserToken] = useState(defaultValue);


    return {
        userToken,
        updateUserToken(token: string) {
            setUserToken(token);
            setItem(token);
        },
        eraseUserToken() {
            removeItem().then(() => setUserToken(null));
        }
    }
}