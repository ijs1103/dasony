import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { BASE_URL } from '@/shared/utils/constants';
import { useMutation } from '@tanstack/react-query';

interface UpdateUserRequest {
  id: number;
  phoneNumber?: string;
  name?: string;
}

const updateUser = async (token: string, data: UpdateUserRequest) => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: 'PUT',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Refresh failed');
  }
};

export const useUpdateUser = () => {
  const token = useAuthStore(state => state.accessToken);
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return updateUser(token, data);
    },
    retry: false,
  });
};
