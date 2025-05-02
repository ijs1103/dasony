import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { BASE_URL } from '@/shared/utils/constants';
import { useMutation } from '@tanstack/react-query';

interface SendFcmRequest {
  serialCode: string;
  title: string;
  body: string;
}

const sendFcm = async (token: string, data: SendFcmRequest) => {
  const response = await fetch(`${BASE_URL}/fcm`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('SendFcm failed');
  }
};

export const useSendFcm = () => {
  const token = useAuthStore(state => state.accessToken);
  return useMutation({
    mutationFn: (data: SendFcmRequest) => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return sendFcm(token, data);
    },
    retry: false,
  });
};
