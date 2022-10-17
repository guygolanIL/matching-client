import React, { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';

import Icons from '@expo/vector-icons/AntDesign';
import { Button } from '../../../components/design-system/Button/Button';
import { useAuth } from '../../../contexts/auth';
import * as Styling from '../../../components/design-system/style';

type Props = {
    location: {
        longitude: number;
        latitude: number;
    };
};

export function GoogleSignInButton(props: Props) {
    const theme = Styling.useTheme();
    const { signIn: {
        mutate: loginWithBackend,
        isLoading
    } } = useAuth();
    const [request, response, loginWithGoogle] = Google.useAuthRequest({
        expoClientId: "860354187714-f84b71d5ivrctigigti0dpeo6s7sq16o.apps.googleusercontent.com",
        iosClientId: "860354187714-hq6kblgtdjv40sqocj2t8dav4kqkpo2s.apps.googleusercontent.com",
        androidClientId: "860354187714-2tikeenfmt1ouvojp1betvkmujurgup4.apps.googleusercontent.com",
    });

    const { location: { latitude, longitude } } = props;

    useEffect(() => {
        if (response?.type === 'success' && response.authentication) {
            if (response.authentication) {
                const { accessToken } = response.authentication;
                console.log(accessToken);
                loginWithBackend('google', {
                    longitude,
                    latitude,
                    googleAccessToken: accessToken,
                });
            }
        }
    }, [response]);

    return (
        <Button
            color='white'
            loading={isLoading}
            labelColor='#dc4e41'
            borderColor='#dc4e41'
            startAdornment={<Icons style={{ marginRight: 20 }} name="google" size={24} color="#dc4e41" />}
            label='Continue with Google'
            onPress={() => loginWithGoogle()}
        />
    );
}