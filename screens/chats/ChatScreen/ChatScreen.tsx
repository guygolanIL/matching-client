import { FlatList, View, Text } from 'react-native'

import { ChatsScreenProps } from "../../../navigation/app/chat/ChatNavigator";
import * as Styling from '../../../components/design-system/style';
import { ChatInputSection } from './ChatInputSection/ChatInputSection';
import { useChat } from '../useChat';
import { useCreateMessageMutation } from '../../../data/chat/hooks/useCreateMessageMutation';
import { useGetMessagesQuery } from '../../../data/chat/hooks/useGetMessagesQuery';
import { useAuth } from '../../../contexts/auth';
import { byDate } from '../../../util/sort';

const useStyles = Styling.createStyles(() => ({
    container: {
        flex: 1,
    },
}));

export function ChatScreen(props: ChatsScreenProps<'Chat'>) {
    const { matchId, matchedWith } = props.route.params;
    const styles = useStyles();
    const { userId } = useAuth();
    const { mutate } = useCreateMessageMutation(userId!);
    const { data, refetch } = useGetMessagesQuery(matchId);
    const { isConnected } = useChat({
        onNewMessage() {
            refetch();
        },
    });

    const sortedData = data?.sort(byDate('desc', message => new Date(message.createdAt)));

    return (
        <View style={styles.container}>
            <Text>{isConnected}</Text>
            <FlatList
                inverted
                data={sortedData || []}
                renderItem={({ item }) => {
                    if (item.createdByUserId === matchedWith.userId) {
                        return <View style={{ backgroundColor: 'red', padding: 20 }}><Text>Him at {item.createdAt}: {item.content}</Text></View>;
                    }

                    return <View style={{ backgroundColor: 'blue', padding: 20 }}><Text>You at {item.createdAt}: {item.content}</Text></View>
                }}
                keyExtractor={(item) => item.id.toString()}
            />
            <ChatInputSection
                onSendMessage={(content) => {
                    mutate({
                        matchId,
                        payload: {
                            content
                        }
                    });
                }}
            />
        </View>
    );
}