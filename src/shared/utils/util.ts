import { All } from '@/features/device/types/all';
import { SocialLoginProvider } from '../lib/stores/useAuthStore';
import { DailyLog } from '@/features/device/types/daily';
import { WeeklyLog } from '@/features/device/types/weekly';
import { Sos } from '@/features/device/types/sos';
import { UsageStatus } from '@/features/frige/types/UsageStatus';
import { DailyLogCount } from '@/features/device/types/all';

const mapProviderToKR = (provider: SocialLoginProvider) => {
  if (provider === 'google') {
    return '구글';
  } else {
    return '카카오';
  }
};
// 냉장고 사용량 상태
const getUsageStatus = (logs: All[]): UsageStatus => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const targetDateStr = `${yyyy}-${mm}-${dd}`;
  const filtered = logs.filter(log => log.createdAt.startsWith(targetDateStr));
  const count = filtered.length;
  if (count === 0) {
    return '최근 활동 없음';
  } else if (count >= 1 && count <= 3) {
    return '소극적 활동 감지';
  } else if (count >= 4 && count <= 10) {
    return '양호한 활동 감지';
  } else {
    return '활발한 활동 감지';
  }
};

const getRecentDetectionTime = (logs: All[]) => {
  if (!logs.length) {
    return null;
  }

  const createdAt = logs[0].createdAt;
  const [, timePart] = createdAt.split(' ');
  if (!timePart) {
    return null;
  }

  const [hourStr, minuteStr] = timePart.split(':');
  if (!hourStr || !minuteStr) {
    return null;
  }

  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  let period = '오전';

  if (hour === 0) {
    hour = 12;
    period = '오전';
  } else if (hour === 12) {
    period = '오후';
  } else if (hour > 12) {
    hour -= 12;
    period = '오후';
  }

  return `${period} ${hour}:${minute}`;
};

const sumLogCounts = (data: DailyLog[] | WeeklyLog[]) => {
  if (!data.length) {
    return 0;
  }
  return data[0].log.reduce((sum, entry) => sum + entry.count, 0);
};

const hasTodaySos = (arr: Sos[]): boolean => {
  if (!arr.length) {
    return false;
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const createdAtDate = arr[0].createdAt.substring(0, 10);

  return createdAtDate === todayStr;
};

const getPowerStatus = (arr: All[]) => {
  if (!arr.length) {
    return {
      powerStatus: '비정상',
      batteryTime: 0,
    };
  }
  return {
    powerStatus: arr[0].logType === 'EXTERNAL_POWER_OFF' ? '비정상' : '정상',
    batteryTime: arr[0].battery,
  };
};

const getDailyLogCounts = (data: All[]): DailyLogCount[] => {
  if (!data || data.length === 0) {
    return [];
  }

  const groupedByDate: { [key: string]: All[] } = {};

  data.forEach(item => {
    if (item.createdAt) {
      const date = new Date(item.createdAt).toISOString().split('T')[0];
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(item);
    }
  });

  return Object.entries(groupedByDate)
    .map(([date, items]) => ({
      date,
      count: items.filter(item => item.logType === 'MOTION').length,
      data: items,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export {
  mapProviderToKR,
  getUsageStatus,
  getRecentDetectionTime,
  sumLogCounts,
  hasTodaySos,
  getPowerStatus,
  getDailyLogCounts,
};
