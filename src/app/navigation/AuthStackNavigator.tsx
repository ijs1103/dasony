import { Suspense, lazy } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

type AuthStackParams = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  SeniorSignUpScreen: undefined;
  AddressScreen: undefined;
};

export const useAuthStackNavigation = <
  RouteName extends keyof AuthStackParams,
>() => useNavigation<NativeStackNavigationProp<AuthStackParams, RouteName>>();

export const useAuthStackRoute = <RouteName extends keyof AuthStackParams>() =>
  useRoute<RouteProp<AuthStackParams, RouteName>>();

const AddressScreenLazy = lazy(() => import('@/screens/AddressScreen'));
const LoginScreenLazy = lazy(() => import('@/screens/LoginScreen'));
const SeniorSignUpScreenLazy = lazy(
  () => import('@/screens/SeniorSignUpScreen'),
);
const SignUpScreenLazy = lazy(() => import('@/screens/SignUpScreen'));

export const AuthStackNavigator = () => {
  return (
    <Suspense fallback={null}>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="LoginScreen" component={LoginScreenLazy} />
        <AuthStack.Screen name="SignUpScreen" component={SignUpScreenLazy} />
        <AuthStack.Screen
          name="SeniorSignUpScreen"
          component={SeniorSignUpScreenLazy}
        />
        <AuthStack.Screen name="AddressScreen" component={AddressScreenLazy} />
      </AuthStack.Navigator>
    </Suspense>
  );
};

export default AuthStackNavigator;
