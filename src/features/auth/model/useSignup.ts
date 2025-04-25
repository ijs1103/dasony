import { useMutation } from '@tanstack/react-query';
import { BASE_URL } from '@/shared/utils/constants';
import { SignupRequest, LoginResponse } from '../types/login';

const signup = async (data: SignupRequest): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => signup(data),
  });
};
