import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-root-toast';
import { createContext, PropsWithChildren, useContext } from 'react';
import { AxiosError } from 'axios';

import { useUserToken } from '../hooks/useUserToken';
import { ApiErrorResponse } from '../data/types';
import { login, LoginRequestPayload, logout, register, RegisterRequestPayload } from '../data/auth/api';
import { jwt } from '../util/jwt';

type IAuthContext = {
    userId?: number,
    signIn: {
        mutate: (payload: LoginRequestPayload, cb?: () => void) => void;
        isLoading: boolean;
    },
    signUp: {
        mutate: (payload: RegisterRequestPayload, cb?: () => void) => void;
        isLoading: boolean;
    },
    signOut: {
        mutate: (cb?: () => void) => void;
        isLoading: boolean;
    }
}

const AuthContext = createContext<IAuthContext>({
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
    const queryClient = useQueryClient();
    const {
        eraseUserToken,
        updateUserToken,
        userToken,

        eraseRefreshToken,
        updateRefreshToken
    } = useUserToken({ defaultValue: props.initialUserToken });
    const { mutate: loginMutation, isLoading: isLoginLoading } = useMutation(login, {
        onError(error: AxiosError<ApiErrorResponse>) {
            Toast.show(error.response?.data?.issues[0]?.message || "Failed to login");
        },
    });
    const { mutate: registerMutation, isLoading: isRegisterLoading } = useMutation(register, {
        onError(error: AxiosError<ApiErrorResponse>) {
            Toast.show(error.response?.data?.issues[0]?.message || 'Failed to register');
        },
    });
    const { mutate: logoutMutation, isLoading: isLogoutLoading } = useMutation(logout, {
        onError(error: AxiosError<ApiErrorResponse>) {
            Toast.show(error.response?.data?.issues[0]?.message || 'Failed to log out');
        },
    });

    function signIn(payload: LoginRequestPayload, cb?: () => void) {
        loginMutation(payload, {
            onSuccess: (data) => {
                updateUserToken(data.result.accessToken);
                updateRefreshToken(data.result.refreshToken);
                cb?.();
            }
        });
    }

    function signUp(payload: RegisterRequestPayload, cb?: () => void) {
        registerMutation(payload, {
            onSuccess(data, variables, context) {
                cb?.();
            },
        })
    }

    function signOut(cb?: () => void) {
        logoutMutation(undefined, {
            onSuccess(data, variables, context) {
                eraseUserToken();
                eraseRefreshToken();
                cb?.();
                queryClient.clear();
            },
        });
    }

    const userId = jwt.extractPayload(userToken)?.userId;

    return (
        <AuthContext.Provider value={{
            userId,
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
