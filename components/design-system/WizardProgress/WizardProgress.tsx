import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import * as Styling from '../style';

type Props = {
    progress: number;
};
const defaultWidth = 200;
const useStyles = Styling.createStyles(({ theme }) => ({
    WizardProgress: {
        width: defaultWidth,
        height: 10,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius.smooth,
        overflow: 'hidden',
    },
    progressBar: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '100%',

        borderRadius: theme.shape.borderRadius.smooth,
    },
}));
export function WizardProgress(props: Props) {
    const startingPosition = -defaultWidth;
    const pan = useRef(new Animated.Value(startingPosition)).current;
    const styles = useStyles();

    useEffect(() => {
        Animated.timing(pan, {
            useNativeDriver: false,
            toValue: startingPosition + (defaultWidth * props.progress),
        }).start();
    }, [props.progress]);

    return (
        <View style={styles.WizardProgress}>
            <Animated.View
                style={[styles.progressBar, {
                    transform: [{ translateX: pan }]
                }]}
            />
        </View>
    );
}