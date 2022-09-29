import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-root-toast';

import { createContext, PropsWithChildren, useContext } from 'react';
import { login, LoginRequestPayload, logout, register, RegisterRequestPayload } from '../data/user/api';
import { useUserToken } from '../hooks/useUserToken';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '../data/types';

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

export const AuthProvider = (props: PropsWithChildren<{ initialUserToken: string | null }>) => {
    const { eraseUserToken, updateUserToken, userToken } = useUserToken({ defaultValue: props.initialUserToken });
    const { mutate: loginMutation, isLoading: isLoginLoading } = useMutation(login, {
        onError(error: AxiosError<ApiErrorResponse>, variables, context) {
            Toast.show(error.response?.data.issues[0].message || "Failed to login");
        },
    });
    const { mutate: registerMutation, isLoading: isRegisterLoading } = useMutation(register, {
        onError(error: AxiosError<ApiErrorResponse>, variables, context) {
            Toast.show(error.response?.data.issues[0].message || 'Failed to register');
        },
    });
    const { mutate: logoutMutation, isLoading: isLogoutLoading } = useMutation(logout, {
        onError(error: AxiosError<ApiErrorResponse>, variables, context) {
            console.log(error);
            Toast.show(error.response?.data.issues[0].message || 'Failed to log out');
        },
    });


    function signIn(payload: LoginRequestPayload, cb: () => void) {
        loginMutation(payload, {
            onSuccess: (data) => {
                updateUserToken(data.result.accessToken);
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
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
} 
