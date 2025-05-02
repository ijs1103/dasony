import { All } from '@/features/device/types/all';
import { StyleSheet, Text, View } from 'react-native';
import PowerOffIcon from '../../../../assets/Report/power_off.svg';
import PowerOnIcon from '../../../../assets/Report/power_on.svg';
import MotionIcon from '../../../../assets/Report/motion_frige.svg';
import AlertIcon from '@/shared/ui/AlertIcon';
import { mapToLogTypeDescription } from '@/features/device/lib/mapToLogTypeDescription';
import { formatDateTime } from '@/features/device/lib/formatDateTime';

interface Props {
  data: All;
}

const ReportListItem = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            borderColor:
              data.logType === 'MOTION'
                ? '#458EF7'
                : ['EXTERNAL_POWER_ON', 'POWER_ON'].includes(data.logType)
                ? '#3BFE34'
                : '#E2574C',
          },
        ]}>
        {['EXTERNAL_POWER_OFF', 'POWER_OFF'].includes(data.logType) && (
          <PowerOffIcon />
        )}
        {['EXTERNAL_POWER_ON', 'POWER_ON'].includes(data.logType) && (
          <PowerOnIcon />
        )}
        {data.logType === 'MOTION' && <MotionIcon />}
        {data.logType === 'SOS' && (
          <AlertIcon color="#E2574C" width={30} height={30} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.logType}>
          {mapToLogTypeDescription(data.logType)}
        </Text>
        <Text style={styles.dateTime}>{formatDateTime(data.createdAt)}</Text>
      </View>
    </View>
  );
};

export default ReportListItem;

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
