import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { sumLogCounts } from '@/shared/utils/util';
import { BASE_URL } from '@/shared/utils/constants';
import { WeeklyLog } from '../types/weekly';

const fetchWeekly = async (token: string): Promise<WeeklyLog[]> => {
  const response = await fetch(`${BASE_URL}/terminal/motion/weekly`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch weekly log');
  }

  return response.json();
};


export const useWeekly = () => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: ['weekly'],
    queryFn: () => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return fetchWeekly(token);
    },
    select: data => {
      const weeklyTotalCount = sumLogCounts(data);
      return {
        weeklyTotalCount,
        weeklyAverage: Math.round(weeklyTotalCount / 7),
      };
    },
    enabled: !!token,
    retry: false,
  });
};
