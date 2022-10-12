import { FlatList, View, ListRenderItem } from 'react-native'

import { ChatsScreenProps } from "../../../navigation/app/chat/ChatNavigator";
import * as Styling from '../../../components/design-system/style';
import { ChatInputSection } from './ChatInputSection/ChatInputSection';
import { useChat } from '../useChat';
import { ChatMessage } from './ChatMessage/ChatMessage';
import { useCallback, useRef } from 'react';
import { Message } from '../../../data/chat/api';

const useStyles = Styling.createStyles(() => ({
    container: {
        flex: 1,
    },
}));

export function ChatScreen(props: ChatsScreenProps<'Chat'>) {
    const { matchId, matchedWith } = props.route.params;
    const styles = useStyles();
    const theme = Styling.useTheme();
    const listRef = useRef<FlatList<Message>>(null);

    const { messages, sendMessage } = useChat(matchId);

    const renderItem: ListRenderItem<Message> = useCallback(({ item }) => {
        if (item.createdByUserId === matchedWith.userId) {
            return <ChatMessage text={item.content} timestamp={item.createdAt} color={theme.palette.primary.light} invert />;
        }
        return <ChatMessage text={item.content} timestamp={item.createdAt} />;
    }, []);

    const keyExtractor = useCallback((item: Message) => item.id.toString(), []);

    return (
        <View style={styles.container}>
            <FlatList
                ref={listRef}
                inverted
                data={messages || []}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
            <ChatInputSection
                onSendMessage={(content) => {
                    sendMessage(content);
                    if (messages?.length !== 0) {
                        listRef.current?.scrollToIndex({ animated: true, index: 0 });
                    }
                }}
            />
        </View>
    );
}