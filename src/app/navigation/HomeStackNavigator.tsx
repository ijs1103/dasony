import AddressUpdateScreen from '@/screens/AddressUpdateScreen';
import ChartScreen from '@/screens/ChartScreen';
import HomeScreen from '@/screens/HomeScreen';
import MemoScreen from '@/screens/MemoScreen';
import NameUpdateScreen from '@/screens/NameUpdateScreen';
import ReportScreen from '@/screens/ReportScreen';
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

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="AddressUpdateScreen"
        component={AddressUpdateScreen}
      />
      <HomeStack.Screen name="NameUpdateScreen" component={NameUpdateScreen} />
      <HomeStack.Screen name="ReportScreen" component={ReportScreen} />
      <HomeStack.Screen name="ChartScreen" component={ChartScreen} />
      <HomeStack.Screen name="MemoScreen" component={MemoScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
