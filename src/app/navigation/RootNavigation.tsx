import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStackNavigator from './HomeStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const hideTabBarScreens = [
  'NotificationsScreen',
  'ModalTestScreen',
  'AddressUpdateScreen',
  'NameUpdateScreen',
  'ReportScreen',
];

const RootNavigation = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          const baseStyle = {
            backgroundColor: theme.colors.background,
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            borderTopWidth: 0,
            position: 'absolute' as const,
            bottom: 0,
            left: 0,
            right: 0,
          };
          if (hideTabBarScreens.includes(routeName)) {
            return { display: 'none', ...baseStyle };
          }
          return { display: 'flex', ...baseStyle };
        })(route),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="web" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigation;
