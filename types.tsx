
import { NavigatorScreenParams } from '@react-navigation/native';
import { AuthScreensParams } from './navigation/auth/AuthNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthScreensParams> | undefined;
  App: undefined;
};
