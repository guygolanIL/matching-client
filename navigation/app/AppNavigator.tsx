import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';

import { FeedScreen } from '../../screens/feed/FeedScreen';
import { ProfileScreen } from '../../screens/profile/ProfileScreen';

export type AppScreensParams = {
    Feed: undefined;
    Profile: undefined;
};
const AppDrawerNavigator = createDrawerNavigator<AppScreensParams>();

export type AppScreenProps<Screen extends keyof AppScreensParams> = DrawerScreenProps<AppScreensParams, Screen, 'app'>;


export function AppNavigator() {
    return (
        <AppDrawerNavigator.Navigator
            id='app'
            backBehavior='none'
        >
            <AppDrawerNavigator.Screen name='Feed' component={FeedScreen} />
            <AppDrawerNavigator.Screen name='Profile' component={ProfileScreen} />
        </AppDrawerNavigator.Navigator>
    );
}