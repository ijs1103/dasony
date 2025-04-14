import ScreenLayout from '@/shared/ui/ScreenLayout';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useTheme } from 'react-native-paper';

const SAMPLE_DATA = [
  { value: 10, label: '1월' },
  { value: 20, label: '2월' },
  { value: 30, label: '3월' },
];

const ChartScreen = () => {
  const theme = useTheme();
  const xAxisLabelTextStyle = {
    fontSize: 12,
    fontWeight: 500,
  };
  const yAxisTextStyle = {
    fontSize: 12,
    fontWeight: 900,
  };
  return (
    <ScreenLayout>
      <View style={styles.chartContainer}>
        <BarChart
          // 기본
          data={SAMPLE_DATA}
          width={160}
          height={160}
          disablePress
          // bar
          initialSpacing={20} // 초기 간격
          spacing={40} // bar 간격
          barBorderRadius={2}
          barWidth={12} // bar width
          frontColor={theme.colors.primary} // bar 색상
          // x축
          xAxisLabelTextStyle={xAxisLabelTextStyle}
          xAxisColor={'red'} // x축 색상
          // y축
          yAxisTextStyle={yAxisTextStyle}
          yAxisThickness={0} // 메인 y축
          noOfSections={3} // 가로 회색줄 갯수
        />
      </View>
    </ScreenLayout>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
