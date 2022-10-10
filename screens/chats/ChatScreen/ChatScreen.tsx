import { View } from 'react-native'

import { ChatsScreenProps } from "../../../navigation/app/chat/ChatNavigator";
import * as Styling from '../../../components/design-system/style';
import { ChatInputSection } from './ChatInputSection/ChatInputSection';

const useStyles = Styling.createStyles(() => ({
    container: {
        flex: 1,
    },
}));

export function ChatScreen(props: ChatsScreenProps<'Chat'>) {
    const styles = useStyles();

    const { route } = props;
    return (
        <View style={styles.container}>
            <ChatInputSection />
        </View>
    );
}