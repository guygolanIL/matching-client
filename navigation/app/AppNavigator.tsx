import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeedScreen } from '../../screens/feed/FeedScreen';

const AppStack = createNativeStackNavigator();


export type AppScreenProps<T extends keyof AppScreensParams> = NativeStackScreenProps<AppScreensParams, T, 'app'>;

export type AppScreensParams = {
    Feed: undefined;
};


export function AppNavigator() {
    return (
        <AppStack.Navigator id='app' screenOptions={{
            headerShown: false
        }}>
            <AppStack.Screen name='Feed' component={FeedScreen} />
        </AppStack.Navigator>
    );
}