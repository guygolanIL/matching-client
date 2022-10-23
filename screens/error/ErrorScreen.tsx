import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../components/design-system/Button/Button';

import { Error } from '../../components/design-system/Error/Error';
import { useAuthContext } from '../../contexts/auth';
import { AppStackScreensParams } from '../../navigation/app/AppStackNavigator';

const loginRelatedErrors = ['Login error'];
export function ErrorScreen(props: NativeStackScreenProps<AppStackScreensParams, 'Error'>) {

    const error = props.route?.params?.message;
    let messageEl: string | React.ReactElement | undefined = error;
    if (error && loginRelatedErrors.includes(error)) {
        messageEl = <LogoutErrorMessage />;
    }
    return (
        <Error message={messageEl || "Sorry, an unknown error occured"} />
    )
}

function LogoutErrorMessage() {
    const auth = useAuthContext();
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sorry, an error with your sign in information has occurred. Please try to log in again</Text>
            <Button label='Logout' onPress={() => auth.signOut.mutate()} />
        </View>
    );
}