import { createContext, PropsWithChildren, useContext, useState } from 'react';

type AuthContextType = {
    loggedIn: boolean,
    signOut: () => void;
    signIn: (email: string, password: string) => void;
    signUp: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    signIn: () => { },
    signOut: () => { },
    signUp: () => { }
});

export const AuthProvider = (props: PropsWithChildren) => {
    const [loggedIn, setLoggedIn] = useState(false);

    function signIn(email: string, password: string) {
        setTimeout(() => {
            console.log('yay')
            setLoggedIn(true);
        }, 2000);
    };

    function signOut() {
        setLoggedIn(false);
    }

    function signUp() {

    }

    return (
        <AuthContext.Provider value={{
            loggedIn,
            signIn,
            signOut,
            signUp
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
} 
