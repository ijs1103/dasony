import { FlatList, StyleSheet, Text } from 'react-native';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import { useReportStackRoute } from '@/app/navigation/ReportStackNavigator';
import ReportListItem from '@/features/frige/ui/ReportListItem';
import ListEmptyComponent from '@/shared/ui/ListEmptyComponent';
import Spacer from '@/shared/ui/Spacer';
import { formatKoreanDate } from '@/features/device/lib/formatKoreanDate';
const ItemSeparatorComponent = () => <Spacer size={6} />;

const ReportDetailScreen = () => {
  const route = useReportStackRoute();
  const dailyLog = route.params?.dailyLog;

  return (
    <ScreenLayout
      title={dailyLog?.date ? formatKoreanDate(dailyLog.date) : 'N/A'}>
      {dailyLog?.data && dailyLog?.data.length > 0 ? (
        <FlatList
          ListHeaderComponent={
            <Text
              style={
                styles.headerText
              }>{`문열림 횟수 : ${dailyLog.count}회`}</Text>
          }
          style={styles.flatList}
          data={dailyLog?.data}
          renderItem={({ item }) => <ReportListItem data={item} />}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      ) : (
        <ListEmptyComponent title={'아직 데이터가 없어요.'} />
      )}
    </ScreenLayout>
  );
};

export default ReportDetailScreen;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
});
