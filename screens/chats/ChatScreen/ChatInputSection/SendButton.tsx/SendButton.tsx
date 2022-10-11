import React from "react";

import SendIcon from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";
import * as Styling from '../../../../../components/design-system/style';

const useStyles = Styling.createStyles(({ theme }) => ({
    button: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.palette.primary.main,
        padding: 13,
        borderRadius: theme.shape.borderRadius.max
    }
}));

export function SendButton(props: { onPress?: () => void }) {
    const styles = useStyles();
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <SendIcon name="send" size={18} color="white" />
        </TouchableOpacity>
    );
}