import { useReportStackNavigation } from '@/app/navigation/ReportStackNavigator';
import { useAll } from '@/features/device/model/useAll';
import { DailyLogCount } from '@/features/device/types/all';
import DailyLogListItem from '@/features/frige/ui/DailyLogListItem';
import ListEmptyComponent from '@/shared/ui/ListEmptyComponent';
import LoadingView from '@/shared/ui/LoadingView';
import MainTitleNavBar from '@/shared/ui/NavigationBars/MainTitleNavBar';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import Spacer from '@/shared/ui/Spacer';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const ItemSeparatorComponent = () => <Spacer size={6} />;

const ReportScreen = () => {
  const navigation = useReportStackNavigation();
  const { data, isLoading, refetch } = useAll();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.log('데이터 새로고침 중 오류 발생:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const navigateToDetail = useCallback((dailyLog: DailyLogCount) => {
    navigation.navigate('ReportDetailScreen', { dailyLog });
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <ScreenLayout>
      {data?.dailyLogCounts && data?.dailyLogCounts.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ListHeaderComponent={
            <View style={{ marginHorizontal: -16 }}>
              <MainTitleNavBar title={'최근 냉장고 활동 리포트'} />
            </View>
          }
          onRefresh={onRefresh}
          refreshing={refreshing}
          style={styles.flatList}
          data={data?.dailyLogCounts}
          renderItem={({ item }) => (
            <DailyLogListItem
              onPress={() => navigateToDetail(item)}
              data={item}
            />
          )}
          keyExtractor={item => item.date}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      ) : (
        <ListEmptyComponent title={'아직 데이터가 없어요.'} />
      )}
    </ScreenLayout>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
});
