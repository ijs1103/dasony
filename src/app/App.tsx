// Firebase 경고 비활성화
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
  PaperProvider,
} from 'react-native-paper';
import RootNavigation from './navigation/RootNavigation';
import useThemeStore from '@/shared/lib/stores/useThemeStore';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { QueryProvider } from '@/shared/utils/queryprovider';
import { TokenManager } from '@/features/auth/model/TokenManager';
import { useFirebaseMessaging } from '@/shared/lib/hooks/useFirebaseMessaging';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  fonts: MD3LightTheme.fonts,
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  fonts: MD3DarkTheme.fonts,
};

const App = () => {
  const isDarkTheme = useThemeStore(state => state.isDarkTheme);
  const paperTheme = isDarkTheme ? CombinedDarkTheme : CombinedLightTheme;
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  useFirebaseMessaging();

  const initializeApp = () => {
    GoogleSignin.configure({
      iosClientId: process.env.iOS_CLIENT_ID,
    });

    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <QueryProvider>
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <NavigationContainer theme={paperTheme}>
            <>
              {isLoggedIn ? <RootNavigation /> : <AuthStackNavigator />}
              <TokenManager />
              <Toast />
            </>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </QueryProvider>
  );
};

export default App;
