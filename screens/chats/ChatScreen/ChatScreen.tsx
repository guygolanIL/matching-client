import { FlatList, View, ListRenderItem, Text } from 'react-native'

import { ChatsScreenProps } from "../../../navigation/app/main/chat/ChatStackNavigator";
import * as Styling from '../../../components/design-system/style';
import { ChatInputSection } from './ChatInputSection/ChatInputSection';
import { useChat } from '../useChat';
import { ChatMessage } from './ChatMessage/ChatMessage';
import { useCallback, useRef } from 'react';
import { Message } from '../../../data/chat/api';
import postMessageSound from '../../../assets/sounds/post-message.mp3';
import { useSound } from '../../../hooks/useSound';

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
    const sound = useSound(postMessageSound);

    const chat = useChat(matchId);

    const renderItem: ListRenderItem<Message> = useCallback(({ item }) => {
        if (item.createdByUserId === matchedWith.userId) {
            return <ChatMessage text={item.content} timestamp={item.createdAt} color={theme.palette.primary.light} invert />;
        }
        return <ChatMessage text={item.content} timestamp={item.createdAt} />;
    }, []);

    const keyExtractor = useCallback((item: Message) => item.id.toString(), []);

    const onSendHandler = (content: string) => {
        chat.sendMessage(content);
        if (chat.messages?.length !== 0) {
            listRef.current?.scrollToIndex({ animated: true, index: 0 });
        }
        sound.play();
    }

    return (
        <View style={styles.container}>
            <FlatList
                ref={listRef}
                inverted
                data={chat.messages || []}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
            <ChatInputSection
                onSendMessage={onSendHandler}
            />
        </View>
    );
}