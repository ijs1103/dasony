import AddressSearchScreen from '@/screens/AddressSearchScreen';
import AlbumScreen from '@/screens/AlbumScreen';
import ChartScreen from '@/screens/ChartScreen';
import HomeScreen from '@/screens/HomeScreen';
import MessageCallScreen from '@/screens/MessageCallScreen';
import ModalTestScreen from '@/screens/ModalTestScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

const HomeStack = createNativeStackNavigator();

type HomeStackParams = {
  HomeScreen: undefined;
  NotificationsScreen: undefined;
  AddressSearchScreen: undefined;
  ChartScreen: undefined;
  MessageCallScreen: undefined;
  ModalTestScreen: undefined;
  AlbumScreen: undefined;
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
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <HomeStack.Screen
        name="AddressSearchScreen"
        component={AddressSearchScreen}
      />
      <HomeStack.Screen name="ChartScreen" component={ChartScreen} />
      <HomeStack.Screen
        name="MessageCallScreen"
        component={MessageCallScreen}
      />
      <HomeStack.Screen name="ModalTestScreen" component={ModalTestScreen} />
      <HomeStack.Screen name="AlbumScreen" component={AlbumScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;

const NotificationsScreen = () => {
  return (
    <View>
      <Text>NotificationsScreen</Text>
    </View>
  );
};
