import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

import { Avatar } from '../../components/design-system/Avatar/Avatar';
import * as Styling from '../../components/design-system/style';
type Props = {
    imageUri: string;
    label: string;
    onPress: () => void;
}
const useStyles = Styling.createStyles(({ theme }) => ({
    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius.smooth,
        backgroundColor: 'white'
    },
    image: {
        marginRight: 10,
    }
}));
export function MatchButton(props: Props) {
    const styles = useStyles();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPress}
        >
            <Avatar uri={props.imageUri} size='medium' radius='max' imageStyle={styles.image} />
            <Text>{props.label}</Text>
        </TouchableOpacity>
    );
}