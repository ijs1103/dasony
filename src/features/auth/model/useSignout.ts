import { BASE_URL } from '@/shared/utils/constants';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/shared/lib/stores/useAuthStore';

const signOut = async (token: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/user/sign-out`, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('SignOut failed');
  }
};

const useSignout = () => {
  const token = useAuthStore(state => state.accessToken);
  return useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }
      return signOut(token);
    },
    retry: false,
  });
};

export default useSignout;
