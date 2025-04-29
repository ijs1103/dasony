import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { BASE_URL } from '@/shared/utils/constants';
import { useQuery } from '@tanstack/react-query';

interface User {
    id: number;
    phoneNumber: string;
    name: string;
}

export const fetchUser = async (token: string): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
};

export const useUser = () => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: ['user'],
    queryFn: () => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return fetchUser(token);
    },
    select: data => {
      return data[0];
    },
    enabled: !!token,
    retry: false,
  });
};
