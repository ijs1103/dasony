import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const ReportStack = createNativeStackNavigator();

type ReportStackParams = {
  LoginScreen: undefined;
  SocailLoginScreen: undefined;
  SignUpScreen: undefined;
  SeniorSignUpScreen: undefined;
  AddressScreen: undefined;
};

export const useReportStackNavigation = <
  RouteName extends keyof ReportStackParams,
>() => useNavigation<NativeStackNavigationProp<ReportStackParams, RouteName>>();

export const useReportStackRoute = <
  RouteName extends keyof ReportStackParams,
>() => useRoute<RouteProp<ReportStackParams, RouteName>>();

export const ReportStackNavigator = () => {
  return (
    <ReportStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ReportStack.Screen name="ReportScreen" component={ReportScreen} />
      <ReportStack.Screen name="ReportDetailScreen" component={SignUpScreen} />
    </ReportStack.Navigator>
  );
};

export default ReportStackNavigator;

const ReportScreen = () => {
  return <></>;
};

const SignUpScreen = () => {
  return <></>;
};
