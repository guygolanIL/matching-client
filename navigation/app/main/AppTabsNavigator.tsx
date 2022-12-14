import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import StackIcon from '@expo/vector-icons/Octicons';
import ProfileIcon from '@expo/vector-icons/AntDesign';
import ChatIcon from '@expo/vector-icons/Ionicons';
import CogIcon from '@expo/vector-icons/Feather';
import { NavigatorScreenParams } from '@react-navigation/native';
import { useEffect } from 'react';

import * as Styling from '../../../components/design-system/style';
import { ProfileScreen } from '../../../screens/profile/ProfileScreen';
import { SettingsScreen } from '../../../screens/settings/SettingsScreen';
import { FeedScreen } from '../../../screens/feed/FeedScreen';
import { ChatStackNavigator, ChatsScreensParams } from './chat/ChatStackNavigator';
import { useSocketContext } from '../../../contexts/socket/socket';
import { useSheetManager } from '../../../hooks/useSheetManager';
import { useQueryClient } from '@tanstack/react-query';
import { getMatchesQueryKey } from '../../../data/chat/hooks/useGetMatchesQuery';

export type AppTabsScreensParams = {
    Feed: undefined;
    Profile: undefined;
    Chats: NavigatorScreenParams<ChatsScreensParams>;
    Settings: undefined;
};
const AppBottomTabs = createBottomTabNavigator<AppTabsScreensParams>();

export type AppScreenProps<Screen extends keyof AppTabsScreensParams> = BottomTabScreenProps<AppTabsScreensParams, Screen, 'main'>;

export function AppTabsNavigator() {
    const theme = Styling.useTheme();
    const sheets = useSheetManager();
    const queryClient = useQueryClient();
    const [, {
        useOnMatchCreated
    }] = useSocketContext();

    useOnMatchCreated((match) => {
        queryClient.refetchQueries([getMatchesQueryKey]);
        sheets.show('new-matching', {
            matchedUserId: match.matchedWith.userId,
        });
    });

    return (
        <AppBottomTabs.Navigator
            id='main'
            initialRouteName='Feed'
            backBehavior='history'
            screenOptions={{
                headerStyle: {
                    ...theme.shadows
                },
                tabBarActiveTintColor: theme.palette.primary.main,
            }}
        >
            <AppBottomTabs.Screen
                name='Feed'
                component={FeedScreen}
                options={{
                    tabBarIcon: ({ color }) => <StackIcon name="stack" size={32} color={color} />
                }}
            />

            <AppBottomTabs.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => <ProfileIcon name="profile" size={32} color={color} />
                }}
            />

            <AppBottomTabs.Screen
                name='Chats'
                component={ChatStackNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <ChatIcon name="chatbubble-ellipses-outline" size={32} color={color} />
                }}
            />

            <AppBottomTabs.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color }) => <CogIcon name="settings" size={32} color={color} />
                }}
            />
        </AppBottomTabs.Navigator>
    );
}
