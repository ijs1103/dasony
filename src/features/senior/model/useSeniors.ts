import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { BASE_URL } from '@/shared/utils/constants';
import { Senior } from '../types/senior';

export const fetchSeniors = async (token: string): Promise<Senior[]> => {
  const response = await fetch(`${BASE_URL}/senior`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch seniors');
  }

  return response.json();
};
export const useSeniors = () => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: ['seniors'],
    queryFn: () => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return fetchSeniors(token);
    },
    select: data => {
      return data[0];
    },
    enabled: !!token,
    retry: false,
  });
};
