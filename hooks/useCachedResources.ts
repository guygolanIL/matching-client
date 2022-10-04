import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useAsyncStorage } from '../util/async-storage';
import { jwt } from '../util/jwt';


function useTokensVerification() {
  const { getItem: getUserToken, removeItem: purgeUserToken } = useAsyncStorage('@user-token');
  const { getItem: getRefreshToken, removeItem: purgeRefreshToken } = useAsyncStorage('@refresh-token');



  return {
    async verify(): Promise<string | null> {
      const savedUserToken = await getUserToken();
      const savedRefreshToken = await getRefreshToken();

      if (!savedRefreshToken || !savedUserToken) return null;

      if (!jwt.validateExpiration(savedRefreshToken)) {
        await purgeRefreshToken();
        await purgeUserToken();
        return null;
      }

      return savedUserToken;
    }
  };
}

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const { verify } = useTokensVerification();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        const verifiedUserToken = await verify();
        setUserToken(verifiedUserToken);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return {
    isLoadingComplete,
    userToken,
  };
}
