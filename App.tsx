import "react-native/Libraries/Types/CodegenTypes";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { RootSiblingParent } from 'react-native-root-siblings';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AuthProvider } from './contexts/auth';
import { queryClient } from './data/query-client';

export default function App() {
  const { isLoadingComplete, userToken } = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootSiblingParent>
            <AuthProvider initialUserToken={userToken}>
              <Navigation colorScheme={colorScheme} />
            </AuthProvider>
            <StatusBar />
          </RootSiblingParent>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
}
