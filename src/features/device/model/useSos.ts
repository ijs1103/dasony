import { useQuery } from '@tanstack/react-query';
import { hasTodaySos } from '@/shared/utils/util';
import useFrigeStatusStore from '@/features/frige/lib/stores/useFrigeStatusStore';
import { useEffect } from 'react';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { Sos } from '../types/sos';
import { BASE_URL } from '@/shared/utils/constants';

const fetchSos = async (token: string): Promise<Sos[]> => {
  const response = await fetch(`${BASE_URL}/terminal/sos`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch sos');
  }
  return response.json();
};

export const useSos = () => {
  const token = useAuthStore(state => state.accessToken);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['sos'],
    queryFn: () => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return fetchSos(token);
    },
  });

  const { resetLifted, isLifted, liftedCreatedAt } = useFrigeStatusStore();

  useEffect(() => {
    if (data && hasTodaySos(data) && isLifted && liftedCreatedAt) {
      const latestSosCreatedAt = data[0]?.createdAt;
      if (
        latestSosCreatedAt &&
        new Date(latestSosCreatedAt) > new Date(liftedCreatedAt)
      ) {
        resetLifted();
      }
    }
  }, [data, resetLifted, isLifted, liftedCreatedAt]);

  return {
    data,
    isLoading,
    refetch,
    hasTodaySos: data ? hasTodaySos(data) : false,
  };
};
