import { View, Text } from 'react-native';

import * as Styling from '../../../../components/design-system/style';

const useStyles = Styling.createStyles(({ theme, props }: { theme: Styling.Theme, props?: { invert?: boolean } }) => ({
    messageRow: {
        padding: 20,
        flexDirection: props?.invert ? 'row-reverse' : 'row',
    },
    messageContentContainer: {
        minWidth: '20%',
        maxWidth: '90%',
        backgroundColor: theme.palette.primary.main,
        borderTopLeftRadius: props?.invert ? theme.shape.borderRadius.smooth : 0,
        borderTopRightRadius: props?.invert ? 0 : theme.shape.borderRadius.smooth,
        borderBottomLeftRadius: theme.shape.borderRadius.smooth,
        borderBottomRightRadius: theme.shape.borderRadius.smooth,
        padding: 7
    },
    messageSender: {
        fontWeight: 'bold'
    },
    timestamp: {
        alignSelf: 'flex-end',
    }
}));

export type Props = {
    text: string;
    timestamp: string;
    sender?: string;
    invert?: boolean;
}
export function ChatMessage(props: Props) {
    const {
        text,
        sender,
        timestamp,
        invert
    } = props;

    const date = new Date(timestamp);

    const styles = useStyles({ invert });
    return (
        <View style={styles.messageRow}>
            <View style={styles.messageContentContainer}>
                {sender && <Text style={styles.messageSender}>{sender}</Text>}
                <Text>{text}</Text>
                <Text style={styles.timestamp}>{`${date.toLocaleTimeString().slice(0, -3)}`}</Text>
            </View>
        </View>
    );
}