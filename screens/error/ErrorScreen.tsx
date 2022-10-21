import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { Error } from '../../components/design-system/Error/Error';
import { AppStackScreensParams } from '../../navigation/app/AppStackNavigator';

export function ErrorScreen(props: NativeStackScreenProps<AppStackScreensParams, 'Error'>) {
    return (
        <Error message={props.route.params.message || "Sorry, an unknown error occured"} />
    )
}