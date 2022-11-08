import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import {Provider} from "react-redux";
import {store,persistor} from "./src/app/store";
import {PersistGate} from "redux-persist/integration/react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {
    QueryClient,
    QueryClientProvider, focusManager, MutationCache
} from '@tanstack/react-query'

import {enableScreens} from "react-native-screens";
// App.js
import 'react-native-reanimated'
enableScreens()




const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode:'online',
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 2000,
            retry: 0,
        },
    },
    // configure global cache callbacks to show toast notifications
    mutationCache: new MutationCache({
        onSuccess: (data) => {
            //  toast.success(data.message);
        },
        onError: (error) => {
            // toast.error(error.message);
        },
    }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>

        <Provider store={store}>
          {/*@ts-ignore*/}

          <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
        <Navigation colorScheme={colorScheme} />
              </QueryClientProvider>
        <StatusBar style="dark" />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
        </GestureHandlerRootView>
    );
  }
}
