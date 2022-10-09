import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { Image, Text } from 'react-native';

import * as Styling from '../../../components/design-system/style';
import { ChatScreen } from '../../../screens/chats/ChatScreen';
import { ChatsScreen } from '../../../screens/chats/ChatsScreen';

export type ChatsScreensParams = {
    Main: undefined;
    Chat: {
        userId: number,
        profileImgUri: string;
    };
};
const ChatStack = createStackNavigator<ChatsScreensParams>();

export type ChatsScreenProps<Screen extends keyof ChatsScreensParams> = StackScreenProps<ChatsScreensParams, Screen, 'chat'>;

export function ChatNavigator() {
    const theme = Styling.useTheme();
    return (
        <ChatStack.Navigator
            id='chat'
            initialRouteName='Main'
        >
            <ChatStack.Screen
                name='Main'
                component={ChatsScreen}
            />

            <ChatStack.Screen
                name='Chat'
                options={({ route }) => ({
                    headerTitle: (props) => (<Image source={{ uri: route.params.profileImgUri }} style={{ width: 50, height: 50, borderRadius: 50, marginLeft: -20 }} />),
                })}
                component={ChatScreen}
            />
        </ChatStack.Navigator>
    );
}
