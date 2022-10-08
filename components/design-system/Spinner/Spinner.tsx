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
    const theme = Styling.useTheme();
    const color = theme.palette.primary.main;
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={color} />
        </View>
    );
}