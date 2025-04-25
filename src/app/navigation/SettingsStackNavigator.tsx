import SettingsScreen from '@/screens/SettingsScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const SettingsStack = createNativeStackNavigator();

type SettingsStackParams = {
  SettingsScreen: undefined;
  PermissionScreen: undefined;
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
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
