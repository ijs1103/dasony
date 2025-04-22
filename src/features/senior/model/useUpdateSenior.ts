import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { BASE_URL } from '@/shared/utils/constants';
import { useMutation } from '@tanstack/react-query';

interface UpdateSeniorRequest {
  serialCode: string;
  address?: string;
  name?: string;
}

const updateSenior = async (token: string, data: UpdateSeniorRequest) => {
  const response = await fetch(`${BASE_URL}/senior`, {
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

export const useUpdateSenior = () => {
  const token = useAuthStore(state => state.accessToken);
  return useMutation({
    mutationFn: (data: UpdateSeniorRequest) => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return updateSenior(token, data);
    },
    retry: false,
  });
};
