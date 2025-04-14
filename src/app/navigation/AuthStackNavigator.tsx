import SocailLoginScreen from '@/screens/SocailLoginScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

type AuthStackParams = {
  SocailLoginScreen: undefined;
};

export const useAuthStackNavigation = <
  RouteName extends keyof AuthStackParams,
>() => useNavigation<NativeStackNavigationProp<AuthStackParams, RouteName>>();

export const useAuthStackRoute = <RouteName extends keyof AuthStackParams>() =>
  useRoute<RouteProp<AuthStackParams, RouteName>>();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen
        name="SocailLoginScreen"
        component={SocailLoginScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
