import { BASE_URL } from '@/shared/utils/constants';
import {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types/refreshToken';
import { useMutation } from '@tanstack/react-query';

export const refreshToken = async (
  data: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  const response = await fetch(`${BASE_URL}/refresh`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Refresh failed');
  }

  return response.json();
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (data: RefreshTokenRequest) => refreshToken(data),
    // 재시도 로직 추가
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // 재시도 간격 - Exponential Backoff
  });
};
