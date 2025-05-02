import { DailyLogCount } from '@/features/device/types/all';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MotionIcon from '../../../../assets/Report/motion_frige.svg';

interface Props {
  data: DailyLogCount;
  onPress: () => void;
}

const DailyLogListItem = ({ data, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MotionIcon />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.logType}>{`${data.count}회`}</Text>
          <Text style={styles.dateTime}>{data.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DailyLogListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#D9D9D91A',
    borderColor: '#458EF7',
  },
  textContainer: {
    gap: 14,
  },
  logType: {
    color: '#111',
    fontSize: 18,
    fontWeight: '700',
  },
  dateTime: {
    fontWeight: '400',
    color: '#111',
  },
});
