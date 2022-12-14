import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import React from 'react';

import { Avatar } from '../../../../components/design-system/Avatar/Avatar';
import { useTheme } from '../../../../components/design-system/style';
import { PublicProfileInfo } from '../../../../data/feed/api';
import { ChatScreen } from '../../../../screens/chats/ChatScreen/ChatScreen';
import { ChatsScreen } from '../../../../screens/chats/ChatsScreen';

export type ChatsScreensParams = {
    Main: undefined;
    Chat: {
        matchedWith: PublicProfileInfo;
        matchId: number;
        profileImgUri: string;
    };
};
const ChatStack = createStackNavigator<ChatsScreensParams>();

export type ChatsScreenProps<Screen extends keyof ChatsScreensParams> = StackScreenProps<ChatsScreensParams, Screen, 'chat'>;

export function ChatStackNavigator() {
    const theme = useTheme();
    return (
        <ChatStack.Navigator
            id='chat'
            initialRouteName='Main'
            screenOptions={{
                headerStyle: {
                    ...theme.shadows,
                }
            }}
        >
            <ChatStack.Screen
                name='Main'
                options={{
                    headerTitle: 'Your matches',
                }}
                component={ChatsScreen}
            />

            <ChatStack.Screen
                name='Chat'
                options={({ route }) => ({
                    headerTitle: (props) => (<Avatar size='small' uri={route.params.profileImgUri} radius='max' imageStyle={{ marginLeft: -10 }} />),
                })}
                component={ChatScreen}
            />
        </ChatStack.Navigator>
    );
}
