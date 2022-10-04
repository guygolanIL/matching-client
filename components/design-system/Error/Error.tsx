import React from "react";
import { StyleSheet, View, Text } from 'react-native';


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