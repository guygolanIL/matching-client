import React, { ReactElement } from "react";
import { View, Text } from 'react-native';
import { managePanProps } from "react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler";

import * as Styling from '../style';

type ErrorProps = {
    message: string | React.ReactElement;
}
const useStyles = Styling.createStyles((theme) => ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}));


export function Error({ message }: ErrorProps) {
    const styles = useStyles();


    let messageElement: ReactElement;
    if (typeof message === "string") {
        messageElement = <Text>{message}</Text>
    } else {
        messageElement = message;
    }

    return (
        <View style={styles.container}>
            {messageElement}
        </View>
    );
}