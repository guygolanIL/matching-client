import { NavigationContainer, DefaultTheme, DarkTheme, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';

import { linking } from './linking';
import { AuthNavigator } from './auth/AuthNavigator';
import { RootStackParamList } from '../types';
import { AppNavigator } from './app/AppNavigator';
import { useAuth } from '../contexts/auth';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const navigationRef = useNavigationContainerRef();

  useReduxDevToolsExtension(navigationRef);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const auth = useAuth();

  return (
    <RootStack.Navigator id='root' initialRouteName={auth.loggedIn ? 'App' : 'Auth'}>
      <RootStack.Screen options={{ headerShown: false }} name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="App" component={AppNavigator} />
    </RootStack.Navigator>
  );
}
