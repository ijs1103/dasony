import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import ReportLabel from './ReportLabel';
import { UsageStatus } from '../types/UsageStatus';
import AlertIcon from '@/shared/ui/AlertIcon';
import CheckIcon from '../../../../assets/Home/check_icon.svg';
import { getUsageColor } from '../lib/getUsageColor';

interface FrigeUsageViewProps {
  usageStatus: UsageStatus;
  onPress: () => void;
}

const FrigeUsageView = ({ usageStatus, onPress }: FrigeUsageViewProps) => {
  const primaryColor = getUsageColor(usageStatus);
  console.log('usageStatus', usageStatus);
  return (
    <View style={styles.container}>
      <View style={styles.vStack}>
        <View style={{ gap: 6 }}>
          <ReportLabel type="usage" />
          <Text style={[styles.usageDescription, { color: primaryColor }]}>
            {usageStatus}
          </Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.cta}>
          <Text>{'자세히 보기'}</Text>
          <Icon source={'chevron-right'} size={23} />
        </TouchableOpacity>
      </View>
      <View style={styles.alertContainer}>
        {['활발한 활동 감지', '양호한 활동 감지'].includes(usageStatus) ? (
          <CheckIcon />
        ) : (
          <AlertIcon color={primaryColor} />
        )}
      </View>
    </View>
  );
};

export default FrigeUsageView;

const styles = StyleSheet.create({
  container: {
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
});
