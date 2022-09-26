import { ActivityIndicator, StyleSheet } from 'react-native';

import { View } from "../../Themed";

export function Spinner() {
    const color = '#7aa7c7'
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});