import { Suspense, lazy } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

type HomeStackParams = {
  HomeScreen: undefined;
  AddressUpdateScreen: undefined;
  NameUpdateScreen: undefined;
  ChartScreen: undefined;
  MessageCallScreen: undefined;
  ModalTestScreen: undefined;
  AlbumScreen: undefined;
  ReportScreen: undefined;
  MemoScreen: undefined;
};

export const useHomeStackNavigation = <
  RouteName extends keyof HomeStackParams,
>() => useNavigation<NativeStackNavigationProp<HomeStackParams, RouteName>>();

export const useHomeStackRoute = <RouteName extends keyof HomeStackParams>() =>
  useRoute<RouteProp<HomeStackParams, RouteName>>();

const AddressUpdateScreen = lazy(() => import('@/screens/AddressUpdateScreen'));
const ChartScreen = lazy(() => import('@/screens/ChartScreen'));
const HomeScreen = lazy(() => import('@/screens/HomeScreen'));
const MemoScreen = lazy(() => import('@/screens/MemoScreen'));
const NameUpdateScreen = lazy(() => import('@/screens/NameUpdateScreen'));
const ReportScreen = lazy(() => import('@/screens/ReportScreen'));

export const HomeStackNavigator = () => {
  return (
    <Suspense fallback={null}>
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen
          name="AddressUpdateScreen"
          component={AddressUpdateScreen}
        />
        <HomeStack.Screen
          name="NameUpdateScreen"
          component={NameUpdateScreen}
        />
        <HomeStack.Screen name="ReportScreen" component={ReportScreen} />
        <HomeStack.Screen name="ChartScreen" component={ChartScreen} />
        <HomeStack.Screen name="MemoScreen" component={MemoScreen} />
      </HomeStack.Navigator>
    </Suspense>
  );
};

export default HomeStackNavigator;
