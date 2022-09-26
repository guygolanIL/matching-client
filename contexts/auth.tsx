import { UseMutateFunction, useMutation, useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext } from 'react';
import { login, LoginRequestPayload, LoginResponse, logout, register, RegisterRequestPayload, RegisterResponse } from '../data/user/api';
import { useUserToken } from '../hooks/useUserToken';

type AuthContextType = {
    loggedIn: boolean,
    userToken: string | null | undefined,
    signIn: {
        mutate: (payload: LoginRequestPayload, cb: () => void) => void;
        isLoading: boolean;
    },
    signUp: {
        mutate: (payload: RegisterRequestPayload, cb: () => void) => void;
        isLoading: boolean;
    },
    signOut: {
        mutate: (cb: () => void) => void;
        isLoading: boolean;
    }
}

const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    userToken: null,
    signIn: {
        isLoading: false,
        mutate: () => { },
    },
    signUp: {
        isLoading: false,
        mutate: () => { },
    },
    signOut: {
        mutate: () => { },
        isLoading: false,
    }
});

export const AuthProvider = (props: PropsWithChildren) => {
    const { userToken, eraseUserToken, setUserToken, isLoading: isFetchingFromLocalStorage } = useUserToken();
    const { mutate: loginMutation, isLoading: isLoginLoading } = useMutation(login);
    const { mutate: registerMutation, isLoading: isRegisterLoading } = useMutation(register);
    const { mutate: logoutMutation, isLoading: isLogoutLoading } = useMutation(logout);


    function signIn(payload: LoginRequestPayload, cb: () => void) {
        loginMutation(payload, {
            onSuccess: (data) => {
                setUserToken(data.result.accessToken);
                cb();
            }
        });
    }

    function signUp(payload: RegisterRequestPayload, cb: () => void) {
        registerMutation(payload, {
            onSuccess(data, variables, context) {
                cb();
            },
        })
    }

    function signOut(cb: () => void) {
        logoutMutation(undefined, {
            onSuccess(data, variables, context) {
                eraseUserToken();
                cb();
            },
        });
    }

    return (
        <AuthContext.Provider value={{
            loggedIn: !!userToken,
            userToken,
            signIn: {
                isLoading: isLoginLoading,
                mutate: signIn,
            },
            signUp: {
                isLoading: isRegisterLoading,
                mutate: signUp
            },
            signOut: {
                isLoading: isLogoutLoading,
                mutate: signOut,
            },
        }}>
            {isFetchingFromLocalStorage ? null : props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
} 
