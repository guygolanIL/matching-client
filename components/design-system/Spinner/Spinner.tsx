import { ActivityIndicator, View } from 'react-native';

import * as Styling from '../style';

const useStyles = Styling.createStyles(() => ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export function Spinner() {
    const styles = useStyles();
    const color = '#7aa7c7'
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={color} />
        </View>
    );
}