import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeStackNavigator from './HomeStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import HomeIcon from '../../../assets/Tabbar/home_tab.svg';
import ReportIcon from '../../../assets/Tabbar/report_tab.svg';
import ProfileIcon from '../../../assets/Tabbar/profile_tab.svg';
import ReportStackNavigator from './ReportStackNavigator';
import { Text } from 'react-native';
const Tab = createBottomTabNavigator();

const hideTabBarScreens = [
  'NotificationsScreen',
  'ModalTestScreen',
  'AddressUpdateScreen',
  'NameUpdateScreen',
  'MemoScreen',
  'ReportDetailScreen',
  'EditProfileScreen',
];

const RootNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          const baseStyle = {
            backgroundColor: '#f1f1f1',
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            borderTopWidth: 0.3,
            borderTopColor: '#000',
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
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? '#458EF7' : '#888888', fontSize: 12 }}>
              홈
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <HomeIcon fill={focused ? '#458EF7' : 'transparent'} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportStackNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? '#458EF7' : '#888888', fontSize: 12 }}>
              대상자 활동 기록
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <ReportIcon fill={focused ? '#458EF7' : 'transparent'} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? '#458EF7' : '#888888', fontSize: 12 }}>
              프로필
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <ProfileIcon fill={focused ? '#458EF7' : 'transparent'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigation;
