import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-paper';
import { useHomeStackNavigation } from '@/app/navigation/HomeStackNavigator';
import MainTitleNavBar from '@/shared/ui/NavigationBars/MainTitleNavBar';
import { useFirebaseMessaging } from '@/shared/lib/hooks/useFirebaseMessaging';
import SeniorLabel from '@/features/senior/ui/SeniorLabel';
import FrigeStatus from '@/features/frige/ui/FrigeStatus';
import ReportLabel from '@/features/frige/ui/ReportLabel';
import Divider from '@/shared/ui/Divider';
import ScrollViewLayout from '@/shared/ui/ScrollViewLayout';
import AlertIcon from '../../assets/Home/alert_icon.svg';

const HomeScreen = () => {
  const navigation = useHomeStackNavigation();
  useFirebaseMessaging();
  return (
    <ScrollViewLayout>
      <MainTitleNavBar
        title="어르신 안전 지킴이 다소니"
        navigateToNotification={() => {}}
        navigateToSetting={() => {}}
      />
      <View style={styles.seniorContainer}>
        <View style={styles.hStack}>
          <View style={styles.seniorInfoContainer}>
            <View style={styles.labelContainer}>
              <SeniorLabel type="name" />
              <Text style={styles.seniorName}>{'김철수'}</Text>
            </View>
            <View style={styles.labelContainer}>
              <SeniorLabel type="power" />
              <Text style={styles.powerStatus}>{'⦁ 정상'}</Text>
            </View>
            <View style={styles.labelContainer}>
              <SeniorLabel type="address" />
              <Text>
                {'⦁ 서울특별시 논현1동 555번길\n   건물명 e동 2048호'}
              </Text>
            </View>
          </View>
          <FrigeStatus type={'unused'} />
        </View>
        <Button style={styles.memoButton} onPress={() => {}} mode="contained">
          {'긴급 메모'}
        </Button>
      </View>
      <View style={styles.reportContainer}>
        <Text style={styles.report}>{'최근 리포트'}</Text>
        <View style={styles.detectionTimeContainer}>
          <ReportLabel type="detectionTime" />
          <Text style={styles.detectionTime}>{'오전 11:40'}</Text>
        </View>
        <View style={styles.statContainer}>
          <View style={styles.hStack2}>
            <View
              style={{
                gap: 10,
                alignSelf: 'flex-start',
                flex: 1,
                paddingLeft: 18,
              }}>
              <Text>오늘</Text>
              <Text style={styles.statCount}>
                9<Text style={{ fontSize: 14 }}> 번</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 16,
                flex: 1,
              }}>
              <Divider vertical />
              <View style={{ gap: 10 }}>
                <Text>최근 7일 평균</Text>
                <Text style={styles.statCount}>
                  48<Text style={{ fontSize: 14 }}> 번</Text>
                </Text>
              </View>
            </View>
          </View>
          <Button
            style={styles.weeklyButton}
            textColor={'#fff'}
            onPress={() => {}}
            mode="contained">
            {'일주일 누적 496번'}
          </Button>
        </View>
        <View style={styles.usageContainer}>
          <View style={styles.vStack}>
            <View style={{ gap: 6 }}>
              <ReportLabel type="usage" />
              <Text style={styles.usageDescription}>최근 활동 없음</Text>
            </View>
            <TouchableOpacity onPress={() => {}} style={styles.cta}>
              <Text>{'자세히 보기'}</Text>
              <Icon source={'chevron-right'} size={23} />
            </TouchableOpacity>
          </View>
          <View style={styles.alertContainer}>
            <AlertIcon />
          </View>
        </View>
      </View>
      <Button
        style={styles.reportButton}
        textColor="#fff"
        onPress={() => {}}
        mode="contained">
        {'기록 전체 보기'}
      </Button>
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
  },
  hStack2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  seniorInfoContainer: {
    justifyContent: 'space-between',
    gap: 40,
  },
  labelContainer: {
    gap: 14,
  },
  seniorName: {
    fontWeight: '700',
    fontSize: 23,
  },
  powerStatus: {
    color: '#10D75F',
  },
  statusContainer: {
    flex: 1,
    gap: 24,
    alignItems: 'center',
  },
  memoButton: {
    borderRadius: 6,
    backgroundColor: '#fff',
    marginTop: 16,
    elevation: 2, // Android 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  reportButton: {
    marginHorizontal: 18,
    borderRadius: 6,
    backgroundColor: '#3182F6',
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
