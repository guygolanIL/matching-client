import React from "react";
import { StyleSheet } from 'react-native';

import { View, Text } from "../../Themed";

type ErrorProps = {
    message: string;
}
export function Error({ message }: ErrorProps) {
    return (
        <View style={styles.container}>
            <Text>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});