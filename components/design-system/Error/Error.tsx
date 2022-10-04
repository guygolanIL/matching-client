import React from "react";
import { View, Text } from 'react-native';

import * as Styling from '../style';

type ErrorProps = {
    message: string;
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
    return (
        <View style={styles.container}>
            <Text>{message}</Text>
        </View>
    );
}