import { NavigatorScreenParams } from '@react-navigation/native';
import { AppScreensParams } from './navigation/app/AppNavigator';

import { AuthScreensParams } from './navigation/auth/AuthNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthScreensParams> | undefined;
  App: NavigatorScreenParams<AppScreensParams> | undefined;
};
