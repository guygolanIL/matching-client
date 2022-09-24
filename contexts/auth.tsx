import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { LoginRequestPayload, RegisterRequestPayload } from '../data/user/api';
import { useRegisterMutation } from '../data/user/hooks/useRegisterMutation';
type AuthContextType = {
    loggedIn: boolean,
    signOut: () => void;
    signIn: () => void;
}

const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    signIn: () => { },
    signOut: () => { },
});

export const AuthProvider = (props: PropsWithChildren) => {
    const [loggedIn, setLoggedIn] = useState(false);

    function signIn() {
        setLoggedIn(true);
    };

    function signOut() {
        setLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{
            loggedIn,
            signIn,
            signOut,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
} 
