import { UsageStatus } from '../types/UsageStatus';

export const getUsageColor = (status: UsageStatus) => {
  switch (status) {
    case '최근 활동 없음':
      return '#FF2727';
    case '소극적 활동 감지':
      return '#FFAA00';
    case '양호한 활동 감지':
      return '#10D75F';
    default:
      return '#10D75F';
  }
};
