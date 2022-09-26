import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useAsyncStorage } from '../util/async-storage';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { getItem } = useAsyncStorage('@user-token');
  const [userToken, setUserToken] = useState<string | null>(null);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        const userToken = await getItem();
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        setUserToken(userToken);
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
