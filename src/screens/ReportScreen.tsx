import { useAll } from '@/features/device/model/useAll';
import ReportListItem from '@/features/frige/ui/ReportListItem';
import ListEmptyComponent from '@/shared/ui/ListEmptyComponent';
import LoadingView from '@/shared/ui/LoadingView';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import Spacer from '@/shared/ui/Spacer';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

const ItemSeparatorComponent = () => <Spacer size={6} />;

const ReportScreen = () => {
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

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <ScreenLayout title="최근 냉장고 활동 리포트">
      {data?.rawData ? (
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          style={styles.flatList}
          data={data?.rawData}
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

export default ReportScreen;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
  },
});
