import { useMutation } from '@tanstack/react-query';
import { BASE_URL } from '@/shared/utils/constants';
import { SeniorSignupRequest } from '../types/login';
import useAuthStore from '@/shared/lib/stores/useAuthStore';

const seniorSignup = async (token: string, data: SeniorSignupRequest) => {
  const response = await fetch(`${BASE_URL}/senior`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
};

export const useSeniorSignup = () => {
  const token = useAuthStore(state => state.accessToken);

  return useMutation({
    mutationFn: (data: SeniorSignupRequest) => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return seniorSignup(token, data);
    },
  });
};
