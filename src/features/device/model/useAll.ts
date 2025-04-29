import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import {
  getPowerStatus,
  getRecentDetectionTime,
  getUsageStatus,
  getDailyLogCounts,
} from '@/shared/utils/util';
import { BASE_URL } from '@/shared/utils/constants';
import { All } from '../types/all';

export const fetchAll = async (token: string): Promise<All[]> => {
  const response = await fetch(`${BASE_URL}/terminal/all`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch power');
  }

  return response.json();
};

export const useAll = () => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: ['all'],
    queryFn: () => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return fetchAll(token);
    },
    select: data => ({
      rawData: data,
      power: getPowerStatus(data),
      usageStatus: getUsageStatus(data),
      recentDetectionTime: getRecentDetectionTime(data),
      dailyLogCounts: getDailyLogCounts(data),
    }),
    enabled: !!token,
    retry: false,
  });
};
