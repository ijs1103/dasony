import { useDaily } from '@/features/device/model/useDaily';
import { useMonthly } from '@/features/device/model/useMonthly';
import { useWeekly } from '@/features/device/model/useWeekly';
import LoadingView from '@/shared/ui/LoadingView';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import { useState } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { SegmentedButtons } from 'react-native-paper';
import { Text } from 'react-native';
import { getTodayKoreanDate } from '@/features/device/lib/getTodayKoreanDate';

const DAILY = 'daily';
const WEEKLY = 'weekly';
const MONTHLY = 'monthly';
type ChartType = typeof DAILY | typeof WEEKLY | typeof MONTHLY;

const ChartScreen = () => {
  const xAxisLabelTextStyle = {
    fontSize: 12,
    fontWeight: 500,
  };
  const yAxisTextStyle = {
    fontSize: 12,
    fontWeight: 900,
  };

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 48 - 48;
  const screenHeight = Dimensions.get('window').height;
  const chartHeight = Math.max(220, Math.min(320, screenHeight * 0.35));

  const [value, setValue] = useState<ChartType>(DAILY);
  const { data: dailyData, isLoading: dailyLoading } = useDaily();
  const { data: weeklyData, isLoading: weeklyLoading } = useWeekly();
  const { data: monthlyData, isLoading: monthlyLoading } = useMonthly();
  const isLoading = dailyLoading || weeklyLoading || monthlyLoading;

  const handleValueChange = (newValue: string) => {
    if (newValue === DAILY || newValue === WEEKLY || newValue === MONTHLY) {
      setValue(newValue);
    }
  };
  const getChartDate = () => {
    switch (value) {
      case DAILY:
        return getTodayKoreanDate();
      case WEEKLY:
        return '이번주';
      case MONTHLY:
        return '이번달';
      default:
        return getTodayKoreanDate();
    }
  };
  const getChartData = () => {
    switch (value) {
      case DAILY:
        return dailyData?.chartData;
      case WEEKLY:
        return weeklyData?.chartData;
      case MONTHLY:
        return monthlyData?.chartData;
      default:
        return dailyData?.chartData;
    }
  };
  const getTotalCount = () => {
    switch (value) {
      case DAILY:
        return `총 ${dailyData?.dailyTotalCount || 0}회`;
      case WEEKLY:
        return `평균 ${weeklyData?.weeklyAverage || 0}회`;
      case MONTHLY:
        return `총 ${monthlyData?.monthlyTotalCount || 0}회`;
      default:
        return 0;
    }
  };
  const getBarSpacing = () => {
    switch (value) {
      case DAILY:
        return 6;
      case WEEKLY:
        return (chartWidth - 7 * getBarWidth()) / 7;
      case MONTHLY:
        return (chartWidth - 6 * getBarWidth()) / 6;
      default:
        return 6;
    }
  };
  const getBarWidth = () => {
    switch (value) {
      case DAILY:
        return 12;
      case WEEKLY:
        return 20;
      case MONTHLY:
        return 24;
      default:
        return 12;
    }
  };

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <ScreenLayout title="문열림 패턴">
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <SegmentedButtons
            value={value}
            onValueChange={handleValueChange}
            buttons={[
              {
                value: DAILY,
                label: '일간',
                checkedColor: '#F8F9F9',
                style: {
                  backgroundColor: value === DAILY ? '#2763FF' : '#f3f3f3',
                  borderWidth: 0,
                },
              },
              {
                value: WEEKLY,
                label: '주간',
                checkedColor: '#F8F9F9',
                style: {
                  backgroundColor: value === WEEKLY ? '#2763FF' : '#f3f3f3',
                  borderWidth: 0,
                },
              },
              {
                value: MONTHLY,
                label: '월간',
                checkedColor: '#F8F9F9',
                style: {
                  backgroundColor: value === MONTHLY ? '#2763FF' : '#f3f3f3',
                  borderWidth: 0,
                },
              },
            ]}
          />
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.totalCountContainer}>
            <Text style={styles.chartDateText}>{getChartDate()}</Text>
            <Text style={styles.totalCountText}>{getTotalCount()}</Text>
          </View>
          <BarChart
            isAnimated
            data={getChartData()}
            height={chartHeight}
            // bar
            initialSpacing={0} // 초기 간격
            spacing={getBarSpacing()} // bar 간격
            barBorderRadius={2}
            barWidth={getBarWidth()} // bar width
            frontColor={'#2763FF'} // bar 색상
            // x축
            xAxisLabelTextStyle={xAxisLabelTextStyle}
            xAxisColor={'#000'}
            showXAxisIndices={false}
            renderTooltip={(item: any) => (
              <View style={styles.tooltipContainer}>
                <Text style={styles.tooltipText}>
                  {value === DAILY
                    ? `${item.label}시: ${item.value}회`
                    : value === WEEKLY
                    ? `${item.label}요일: ${item.value}회`
                    : `${item.label}: ${item.value}회`}
                </Text>
              </View>
            )}
            // y축
            yAxisTextStyle={yAxisTextStyle}
            yAxisThickness={0} // 메인 y축
            noOfSections={5} // 가로 회색줄 갯수
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
    gap: 16,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 48,
    paddingVertical: 24,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  chartContainer: {
    flex: 1,
    gap: 32,
    backgroundColor: '#fff',
    padding: 24,
    paddingBottom: 48,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  totalCountContainer: {
    gap: 8,
  },
  chartDateText: {
    fontSize: 16,
    fontWeight: '400',
  },
  totalCountText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  tooltipContainer: {
    backgroundColor: 'darkgray',
    padding: 6,
    borderRadius: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    marginTop: 10,
    transform: [{ translateY: 25 }],
    position: 'relative',
  },
  tooltipText: {
    color: 'white',
    fontWeight: '500',
  },
});
