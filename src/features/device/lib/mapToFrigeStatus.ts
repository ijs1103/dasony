import { FrigeStatus } from '@/features/frige/types/FrigeStatus';

interface Props {
  isLifted: boolean;
  hasTodaySos: boolean;
  dailyData: any;
  deviceData: any;
}

export const mapToFrigeStatus = ({
  isLifted,
  hasTodaySos,
  dailyData,
  deviceData,
}: Props): FrigeStatus => {
  if (hasTodaySos && !isLifted) {
    return 'emergency';
  }
  if (deviceData?.usageStatus === '최근 활동 없음') {
    return 'unused';
  }
  if (dailyData && dailyData?.dailyTotalCount > 0) {
    return 'active';
  } else {
    return 'inactive';
  }
};
