import React, { Suspense, lazy } from 'react';
import { DailyLogCount } from '@/features/device/types/all';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const ReportStack = createNativeStackNavigator();

type ReportStackParams = {
  ReportScreen: undefined;
  ReportDetailScreen: { dailyLog: DailyLogCount };
};

export const useReportStackNavigation = <
  RouteName extends keyof ReportStackParams,
>() => useNavigation<NativeStackNavigationProp<ReportStackParams, RouteName>>();

export const useReportStackRoute = <
  RouteName extends keyof ReportStackParams,
>() => useRoute<RouteProp<ReportStackParams, RouteName>>();

const ReportDetailScreen = lazy(() => import('@/screens/ReportDetailScreen'));
const ReportScreen = lazy(() => import('@/screens/ReportScreen'));

export const ReportStackNavigator = () => {
  return (
    <Suspense fallback={null}>
      <ReportStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <ReportStack.Screen name="ReportScreen" component={ReportScreen} />
        <ReportStack.Screen
          name="ReportDetailScreen"
          component={ReportDetailScreen}
        />
      </ReportStack.Navigator>
    </Suspense>
  );
};

export default ReportStackNavigator;
