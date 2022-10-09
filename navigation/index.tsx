import { NavigationContainer, NavigatorScreenParams, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import React from 'react';

import { linking } from './linking';
import { AuthNavigator, AuthScreensParams } from './auth/AuthNavigator';
import { AppNavigator, AppScreensParams } from './app/AppNavigator';
import { useAuth } from '../contexts/auth';
import { SheetProvider } from 'react-native-actions-sheet';


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthScreensParams> | undefined;
  App: NavigatorScreenParams<AppScreensParams> | undefined;
};


export default function Navigation() {
  const navigationRef = useNavigationContainerRef();

  useReduxDevToolsExtension(navigationRef);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
    >
      <SheetProvider>
        <RootNavigator />
      </SheetProvider>
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { userEmail } = useAuth();

  return (
    <RootStack.Navigator
      id='root'
      initialRouteName={userEmail ? 'App' : 'Auth'}
    >
      {userEmail ?
        <RootStack.Screen options={{ headerShown: false }} name="App" component={AppNavigator} />
        : <RootStack.Screen options={{ headerShown: false }} name="Auth" component={AuthNavigator} />}

    </RootStack.Navigator>
  );
}

