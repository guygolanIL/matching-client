import { NavigationContainer, NavigatorScreenParams, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import React from 'react';
import { SheetProvider } from 'react-native-actions-sheet';

import { linking } from './linking';
import { AuthStackNavigator, AuthScreensParams } from './auth/AuthStackNavigator';
import { useAuthContext } from '../contexts/auth';
import { AppStackNavigator, AppStackScreensParams } from './app/AppStackNavigator';
import { SocketProvider } from '../contexts/socket/socket';
import { SocketDevTools } from '../contexts/socket/SocketDevTools';


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthScreensParams> | undefined;
  App: NavigatorScreenParams<AppStackScreensParams> | undefined;
};


export default function Navigation() {
  const navigationRef = useNavigationContainerRef();
  const userId = useAuthContext().userId;
  useReduxDevToolsExtension(navigationRef);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
    >
      <SocketProvider userId={userId}>
        <SheetProvider>
          <RootStackNavigator />
        </SheetProvider>
        <SocketDevTools />
      </SocketProvider>
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const { userId } = useAuthContext();

  function mapToNavigator() {
    if (!userId) return <RootStack.Screen options={{ headerShown: false }} name="Auth" component={AuthStackNavigator} />;
    return <RootStack.Screen name="App" options={{ headerShown: false }} component={AppStackNavigator} />;
  }

  return (
    <RootStack.Navigator
      id='root'
      initialRouteName={userId ? 'App' : 'Auth'}
    >
      {mapToNavigator()}
    </RootStack.Navigator>
  );
}

