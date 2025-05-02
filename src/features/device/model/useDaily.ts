import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { sumLogCounts } from '@/shared/utils/util';
import { BASE_URL } from '@/shared/utils/constants';
import { DailyLog } from '../types/daily';
import { mapToDailyChartData } from '../lib/mapToChartData';

const fetchDaily = async (token: string): Promise<DailyLog[]> => {
  const response = await fetch(`${BASE_URL}/terminal/motion/daily`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch daily log');
  }

  return response.json();
};

export const useDaily = () => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: ['daily', token],
    queryFn: () => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return fetchDaily(token);
    },
    select: data => {
      return {
        dailyTotalCount: sumLogCounts(data),
        chartData: mapToDailyChartData(data[0].log),
      };
    },
    enabled: !!token,
    retry: false,
  });
};
