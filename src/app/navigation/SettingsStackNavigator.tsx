import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

const SettingsStack = createNativeStackNavigator();

type SettingsStackParams = {
  SettingsScreen: undefined;
  NoticeScreen: undefined;
  CsScreen: undefined;
};

export const useHomeStackNavigation = <
  RouteName extends keyof SettingsStackParams,
>() => useNavigation<NativeStackNavigationProp<SettingsStackParams, RouteName>>();

export const useHomeStackRoute = <RouteName extends keyof SettingsStackParams>() =>
  useRoute<RouteProp<SettingsStackParams, RouteName>>();

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SettingsStack.Screen
        name="NoticeScreen"
        component={NoticeScreen}
      />
      <SettingsStack.Screen
        name="CsScreen"
        component={CsScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;

const SettingsScreen = () => {
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  );
};

const NoticeScreen = () => {
  return (
    <View>
      <Text>NoticeScreen</Text>
    </View>
  );
};

const CsScreen = () => {
    return (
      <View>
        <Text>CsScreen</Text>
      </View>
    );
  };
