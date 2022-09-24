import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';
import { useAuth } from '../contexts/auth';
import { AuthNavigator } from './auth/AuthNavigator';
import { RootStackParamList } from '../types';
import { AppNavigator } from './app/AppNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const auth = useAuth();

  return (
    <RootStack.Navigator>
      {!auth.loggedIn && <RootStack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />}
      {auth.loggedIn && <RootStack.Screen name="App" component={AppNavigator} />}
    </RootStack.Navigator>
  );
}
