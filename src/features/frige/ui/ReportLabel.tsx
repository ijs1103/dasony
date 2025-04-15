import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  type: 'detectionTime' | 'usage';
}

const ReportLabel = ({ type }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/Home/clock_icon.png')} />
      <Text>
        {type === 'detectionTime'
          ? '오늘 마지막 감지시간'
          : '냉장고 사용 활동량'}
      </Text>
    </View>
  );
};

export default ReportLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
