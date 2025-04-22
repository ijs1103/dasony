import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { BASE_URL } from '@/shared/utils/constants';
import { Power } from '../types/power';

const fetchPowers = async (token: string): Promise<Power[]> => {
  const response = await fetch(`${BASE_URL}/terminal/power`, {
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

export const usePowers = () => {
  const token = useAuthStore(state => state.accessToken);

  return useQuery({
    queryKey: ['powers'],
    queryFn: () => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return fetchPowers(token);
    },
    select: data => {
      return {
        isOn: data[0].isOn,
        battery: data[0].battery,
      };
    },
    enabled: !!token,
    retry: false,
  });
};
