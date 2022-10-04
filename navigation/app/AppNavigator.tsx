import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import StackIcon from '@expo/vector-icons/Octicons';
import ProfileIcon from '@expo/vector-icons/AntDesign';

import { FeedScreen } from '../../screens/feed/FeedScreen';
import { ProfileScreen } from '../../screens/profile/ProfileScreen';

export type AppScreensParams = {
    Feed: undefined;
    Profile: undefined;
};
const AppBottomTabs = createBottomTabNavigator<AppScreensParams>();

export type AppScreenProps<Screen extends keyof AppScreensParams> = BottomTabScreenProps<AppScreensParams, Screen, 'app'>;

export function AppNavigator() {
    return (
        <AppBottomTabs.Navigator
            id='app'
            backBehavior='none'
            screenOptions={{
                tabBarActiveTintColor: '#7aa7c7',
            }}
        >
            <AppBottomTabs.Screen
                name='Feed'
                component={FeedScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <StackIcon name="stack" size={32} color={color} />
                }}
            />

            <AppBottomTabs.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <ProfileIcon name="profile" size={32} color={color} />
                }}
            />
        </AppBottomTabs.Navigator>
    );
}
