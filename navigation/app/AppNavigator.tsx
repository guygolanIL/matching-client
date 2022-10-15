import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import StackIcon from '@expo/vector-icons/Octicons';
import ProfileIcon from '@expo/vector-icons/AntDesign';
import ChatIcon from '@expo/vector-icons/Ionicons';
import CogIcon from '@expo/vector-icons/Feather';

import * as Styling from '../../components/design-system/style';
import { ProfileScreen } from '../../screens/profile/ProfileScreen';
import { SettingsScreen } from '../../screens/settings/SettingsScreen';
import { FeedScreen } from '../../screens/feed/FeedScreen';
import { ChatNavigator, ChatsScreensParams } from './chat/ChatNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';

export type AppScreensParams = {
    Feed: undefined;
    Profile: undefined;
    Chats: NavigatorScreenParams<ChatsScreensParams>;
    Settings: undefined;
};
const AppBottomTabs = createBottomTabNavigator<AppScreensParams>();

export type AppScreenProps<Screen extends keyof AppScreensParams> = BottomTabScreenProps<AppScreensParams, Screen, 'app'>;

export function AppNavigator() {
    const theme = Styling.useTheme();
    return (
        <AppBottomTabs.Navigator
            id='app'
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
                component={ChatNavigator}
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
