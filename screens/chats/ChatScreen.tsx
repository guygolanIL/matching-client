import { Text } from 'react-native'

import { ChatsScreenProps } from "../../navigation/app/chat/ChatNavigator";

export function ChatScreen(props: ChatsScreenProps<'Chat'>) {
    const { route } = props;
    return (<Text>{route.params.userId}</Text>);
}