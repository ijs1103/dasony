import LoginScreen from '@/screens/LoginScreen';
import SeniorSignUpScreen from '@/screens/SeniorSignUpScreen';
import SignUpScreen from '@/screens/SignUpScreen';
import SocailLoginScreen from '@/screens/SocailLoginScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

type AuthStackParams = {
  LoginScreen: undefined;
  SocailLoginScreen: undefined;
  SignUpScreen: undefined;
  SeniorSignUpScreen: undefined;
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
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <AuthStack.Screen name="SeniorSignUpScreen" component={SeniorSignUpScreen} />
      <AuthStack.Screen
        name="SocailLoginScreen"
        component={SocailLoginScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
