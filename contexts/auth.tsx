import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-root-toast';
import { createContext, PropsWithChildren, useContext } from 'react';
import { AxiosError } from 'axios';

import { useUserToken } from '../hooks/useUserToken';
import { ApiErrorResponse } from '../data/types';
import { GoogleLoginRequestPayload, login, LocalLoginRequestPayload, LoginResponse, loginWithGoogle, logout, register, RegisterRequestPayload } from '../data/auth/api';
import { jwt } from '../util/jwt';

type LoginStrategyPayload = {
    'google': GoogleLoginRequestPayload,
    'password': LocalLoginRequestPayload,
};

type SignInFn = <T extends keyof LoginStrategyPayload>(
    ...args: [strategy: T, payload: LoginStrategyPayload[T]]
) => void;

type IAuthContext = {
    userId?: number,
    signIn: {
        mutate: SignInFn;
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
    const { mutate: loginWithGoogleMutation, isLoading: isLoginWithGoogleLoading } = useMutation(loginWithGoogle, {
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
        onSettled(data, error, variables, context) {
            eraseUserToken();
            eraseRefreshToken();
            queryClient.clear();
        },
        onError(error: AxiosError<ApiErrorResponse>) {
            Toast.show(error.response?.data?.issues[0]?.message || 'Failed to log out');
        },
    });

    const signIn: SignInFn = (using, payload) => {
        const onSuccess = (data: LoginResponse) => {
            updateUserToken(data.result.accessToken);
            updateRefreshToken(data.result.refreshToken);
        };

        if (using === 'password') {
            loginMutation(payload as LocalLoginRequestPayload, {
                onSuccess
            });
        }

        if (using === 'google') {
            loginWithGoogleMutation(payload as GoogleLoginRequestPayload, {
                onSuccess
            });
        }
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

            },
        });
    }

    const userId = jwt.extractPayload(userToken)?.userId;

    return (
        <AuthContext.Provider value={{
            userId,
            signIn: {
                isLoading: isLoginLoading || isLoginWithGoogleLoading,
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
