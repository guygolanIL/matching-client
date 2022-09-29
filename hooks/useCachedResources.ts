import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useAsyncStorage } from '../util/async-storage';
import { jwt } from '../util/jwt';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { getItem, removeItem } = useAsyncStorage('@user-token');
  const [userToken, setUserToken] = useState<string | null>(null);


  async function handleUserTokenValidation() {
    const userToken = await getItem();
    if (userToken) {
      const valid = jwt.validateExpiration(userToken);
      if (valid) {
        setUserToken(userToken);
      } else {
        removeItem();
      }
    }
  }

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
        await handleUserTokenValidation();
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
