import EditProfileScreen from '@/screens/EditProfileScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import { WebViewScreen } from '@/screens/WebViewScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const SettingsStack = createNativeStackNavigator();

type SettingsStackParams = {
  SettingsScreen: undefined;
  PermissionScreen: undefined;
  EditProfileScreen: undefined;
  WebViewScreen: { uri: string | undefined };
};

export const useSettingsStackNavigation = <
  RouteName extends keyof SettingsStackParams,
>() =>
  useNavigation<NativeStackNavigationProp<SettingsStackParams, RouteName>>();

export const useSettingsStackRoute = <
  RouteName extends keyof SettingsStackParams,
>() => useRoute<RouteProp<SettingsStackParams, RouteName>>();

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SettingsStack.Screen
        name="PermissionScreen"
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <SettingsStack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
