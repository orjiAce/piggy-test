import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';






export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);


  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    let timeOut: string | number | NodeJS.Timeout | undefined
    async function loadResourcesAndDataAsync() {


      try {

        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'faktum-bold': require('../assets/fonts/Faktum-Bold.otf'),
          'faktum-light': require('../assets/fonts/Faktum-Light.otf'),
          'faktum-regular': require('../assets/fonts/Faktum-Regular.otf'),
          'faktum-medium': require('../assets/fonts/Faktum-Medium.otf'),
          'faktum-semi-bold': require('../assets/fonts/Faktum-SemiBold.otf'),
          'faktum-extra-bold': require('../assets/fonts/Faktum-ExtraBold.otf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        timeOut =  await setTimeout( ()=>{ SplashScreen.hideAsync()},4000);
      }
    }

    loadResourcesAndDataAsync();

    return ()=>{
      clearTimeout(timeOut)
    }
  }, []);

  return isLoadingComplete;
}
