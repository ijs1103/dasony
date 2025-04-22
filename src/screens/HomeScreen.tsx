import { StyleSheet, Text, View, RefreshControl, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { useHomeStackNavigation } from '@/app/navigation/HomeStackNavigator';
import MainTitleNavBar from '@/shared/ui/NavigationBars/MainTitleNavBar';
import SeniorLabel from '@/features/senior/ui/SeniorLabel';
import FrigeStatusView from '@/features/frige/ui/FrigeStatusView';
import ReportLabel from '@/features/frige/ui/ReportLabel';
import FrigeUsageView from '@/features/frige/ui/FrigeUsageView';
import Divider from '@/shared/ui/Divider';
import ScrollViewLayout from '@/shared/ui/ScrollViewLayout';
import { useAll } from '@/features/device/model/useAll';
import { useSeniors } from '@/features/senior/model/useSeniors';
import { useState, useCallback, useEffect } from 'react';
import { useDaily } from '@/features/device/model/useDaily';
import { useWeekly } from '@/features/device/model/useWeekly';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import useLogout from '@/features/auth/model/useLogout';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import { FrigeStatus } from '@/features/frige/types/FrigeStatus';
import { useSos } from '@/features/device/model/useSos';
import { mapToFrigeStatus } from '@/features/device/lib/mapToFrigeStatus';
import PowerStatusLabel from '@/features/device/ui/PowerStatusLabel';
import YesorNoAlert from '@/shared/ui/YesorNoAlert';
import useFrigeStatusStore from '@/features/frige/lib/stores/useFrigeStatusStore';

const HomeScreen = () => {
  const navigation = useHomeStackNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const logoutMutation = useLogout();
  const handleLogout = useAuthStore(state => state.handleLogout);
  const serialCode = useAuthStore(state => state.serialCode) ?? '';
  const isLifted = useFrigeStatusStore(state => state.isLifted);
  const setIsLifted = useFrigeStatusStore(state => state.setIsLifted);

  const navigateToNotification = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        handleLogout();
      },
      onError: () => {
        return showErrorToast({ text: '로그아웃 실패' });
      },
    });
  };
  const {
    data: deviceData,
    isLoading: isAllLoading,
    refetch: allRefetch,
  } = useAll();
  const {
    data: dailyData,
    isLoading: isDailyLoading,
    refetch: dailyRefetch,
  } = useDaily();
  const {
    data: weeklyData,
    isLoading: isWeeklyLoading,
    refetch: weeklyRefetch,
  } = useWeekly();
  const {
    data: senior,
    isLoading: isSeniorsLoading,
    refetch: seniorRefetch,
  } = useSeniors();
  const {
    data: sosData,
    hasTodaySos,
    isLoading: isSosLoading,
    refetch: sosRefetch,
  } = useSos();
  const [frigeStatus, setFrigeStatus] = useState<FrigeStatus>('inactive');
  useEffect(() => {
    if (sosData && dailyData && deviceData) {
      const newFrigeStatus = mapToFrigeStatus({
        isLifted,
        hasTodaySos,
        dailyData,
        deviceData,
      });
      setFrigeStatus(newFrigeStatus);
    }
  }, [isLifted, sosData, hasTodaySos, dailyData, deviceData]);

  const [alertVisible, setAlertVisible] = useState(false);

  const toggleAlertVisible = useCallback(() => {
    setAlertVisible(prev => !prev);
  }, []);
  const onPressYes = useCallback(() => {
    const now = new Date().toISOString();
    setIsLifted(true, now);
    setFrigeStatus('active');
    setAlertVisible(prev => !prev);
  }, [setIsLifted]);

  const editNameHandler = useCallback(() => {
    navigation.navigate('NameUpdateScreen');
  }, []);

  const editAddressHandler = useCallback(() => {
    navigation.navigate('AddressUpdateScreen');
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        allRefetch(),
        dailyRefetch(),
        weeklyRefetch(),
        seniorRefetch(),
        sosRefetch(),
      ]);
    } catch (error) {
      console.log('데이터 새로고침 중 오류 발생:', error);
    } finally {
      setRefreshing(false);
    }
  }, [allRefetch, dailyRefetch, weeklyRefetch, seniorRefetch, sosRefetch]);

  const isLoading =
    isAllLoading ||
    isDailyLoading ||
    isWeeklyLoading ||
    isSeniorsLoading ||
    isSosLoading;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <ScrollViewLayout
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <MainTitleNavBar
        title={`어르신 안전 지킴이 "다소니" (${serialCode})`}
        navigateToNotification={navigateToNotification}
        navigateToSetting={() => {}}
      />
      <View style={styles.seniorContainer}>
        <View style={styles.hStack}>
          <View style={styles.seniorInfoContainer}>
            <View style={styles.labelContainer}>
              <SeniorLabel type="name" editNameHandler={editNameHandler} />
              <Text
                style={styles.seniorName}
                numberOfLines={1}
                ellipsizeMode="tail">
                {senior?.name ?? 'N/A'}
              </Text>
            </View>
            <View style={styles.labelContainer}>
              <SeniorLabel type="power" />
              <PowerStatusLabel
                powerStatus={deviceData?.power.powerStatus ?? 'N/A'}
                batteryTime={deviceData?.power.batteryTime ?? 0}
              />
            </View>
            <View style={styles.labelContainer}>
              <SeniorLabel
                type="address"
                editAddressHandler={editAddressHandler}
              />
              <Text>{senior?.address ?? 'N/A'}</Text>
            </View>
          </View>
          <FrigeStatusView status={frigeStatus} onPress={toggleAlertVisible} />
        </View>
        <View style={styles.memoButtonContainer}>
          <Button style={styles.memoButton} onPress={() => {}} mode="contained">
            {'긴급 메모'}
          </Button>
        </View>
      </View>
      <View style={styles.reportContainer}>
        <Text style={styles.report}>{'최근 리포트'}</Text>
        <View style={styles.detectionTimeContainer}>
          <ReportLabel type="detectionTime" />
          <Text style={styles.detectionTime}>
            {deviceData?.recentDetectionTime ?? 'N/A'}
          </Text>
        </View>
        <View style={styles.statContainer}>
          <View style={styles.hStack2}>
            <View style={styles.dailyTotalCountContainer}>
              <Text>오늘</Text>
              <Text style={styles.statCount}>
                {dailyData?.dailyTotalCount}
                <Text> 번</Text>
              </Text>
            </View>
            <View style={styles.weeklyStatContainer}>
              <Divider vertical />
              <View style={{ gap: 10 }}>
                <Text>이번 주 평균</Text>
                <Text style={styles.statCount}>
                  {weeklyData?.weeklyAverage ?? 0}
                  <Text> 번</Text>
                </Text>
              </View>
            </View>
          </View>
          <Button
            style={styles.weeklyButton}
            textColor={'#fff'}
            onPress={() => {}}
            mode="contained">
            {`일주일 누적 ${weeklyData?.weeklyTotalCount}번`}
          </Button>
        </View>
        <FrigeUsageView
          usageStatus={deviceData?.usageStatus ?? '최근 활동 없음'}
          onPress={() => {}}
        />
      </View>
      <View style={styles.reportButtonContainer}>
        <Button
          style={[styles.reportButton, { opacity: disabled ? 0.5 : 1 }]}
          textColor="#fff"
          onPress={() => {}}
          mode="contained"
          disabled={disabled}>
          {'기록 전체 보기'}
        </Button>
      </View>
      <YesorNoAlert
        visible={alertVisible}
        onDismiss={toggleAlertVisible}
        title={'알림'}
        content={'현재 상태를 확인하였고 비상 상태를 해제하시겠습니까?'}
        onPressYes={onPressYes}
        onPressNo={toggleAlertVisible}
      />
    </ScrollViewLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  seniorContainer: {
    backgroundColor: '#fff',
    paddingTop: 34,
    paddingHorizontal: 34,
    paddingBottom: 14,
    gap: 48,
  },
  hStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hStack2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  seniorInfoContainer: {
    justifyContent: 'space-between',
    gap: 40,
    flex: 1,
    marginRight: 16,
  },
  labelContainer: {
    gap: 14,
  },
  seniorName: {
    fontWeight: '700',
    fontSize: 23,
    flexShrink: 1,
  },
  powerOn: {
    color: '#10D75F',
  },
  powerOff: {
    color: '#FF2727',
  },
  statusContainer: {
    flex: 1,
    gap: 24,
    alignItems: 'center',
  },
  memoButtonContainer: {
    ...Platform.select({
      android: {
        elevation: 8,
        backgroundColor: '#fff',
        borderRadius: 6,
        marginTop: 16,
        padding: 1,
      },
      ios: {
        marginTop: 16,
      },
    }),
  },
  memoButton: {
    borderRadius: 6,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  reportContainer: {
    marginTop: 28,
    backgroundColor: '#fff',
    paddingTop: 18,
    paddingBottom: 30,
  },
  report: {
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 24,
  },
  detectionTimeContainer: {
    marginTop: 26,
    marginLeft: 36,
    gap: 6,
  },
  detectionTime: {
    fontWeight: '700',
    fontSize: 23,
  },
  statContainer: {
    borderWidth: 0.3,
    borderRadius: 12,
    paddingTop: 20,
    marginTop: 28,
    marginHorizontal: 16,
    paddingHorizontal: 8,
    paddingBottom: 6,
    backgroundColor: '#F4F5F8',
    gap: 12,
  },
  weeklyButton: {
    backgroundColor: '#000',
  },
  dailyTotalCountContainer: {
    gap: 10,
    alignSelf: 'flex-start',
    flex: 1,
    paddingLeft: 18,
  },
  weeklyStatContainer: {
    flexDirection: 'row',
    gap: 16,
    flex: 1,
  },
  statCount: {
    fontWeight: '700',
    fontSize: 23,
  },
  usageContainer: {
    marginTop: 44,
    paddingHorizontal: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usageDescription: {
    fontWeight: '700',
    fontSize: 23,
  },
  cta: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  vStack: {
    justifyContent: 'space-between',
  },
  alertContainer: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f6f6f8',
    paddingHorizontal: 32,
    paddingVertical: 36,
  },
  reportButtonContainer: {
    ...Platform.select({
      android: {
        elevation: 8,
        backgroundColor: '#3182F6',
        borderRadius: 6,
        marginHorizontal: 18,
        marginTop: 16,
        padding: 1,
      },
      ios: {
        marginHorizontal: 18,
        marginTop: 16,
      },
    }),
  },
  reportButton: {
    borderRadius: 6,
    backgroundColor: '#3182F6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
