import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { sumLogCounts } from '@/shared/utils/util';
import { BASE_URL } from '@/shared/utils/constants';
import { mapToMonthlyChartData } from '../lib/mapToChartData';
import { MonthlyLog } from '../types/monthly';

const fetchMonthly = async (token: string): Promise<MonthlyLog[]> => {
  const response = await fetch(`${BASE_URL}/terminal/motion/monthly`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch monthly log');
  }

  return response.json();
};

export const useMonthly = () => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: ['monthly', token],
    queryFn: () => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return fetchMonthly(token);
    },
    select: data => {
      return {
        monthlyTotalCount: data[0].log[data[0].log.length - 1].count,
        chartData: mapToMonthlyChartData(data[0].log),
      };
    },
    enabled: !!token,
    retry: false,
  });
};
