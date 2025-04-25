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
  });
};
