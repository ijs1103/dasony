import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SocialLoginProvider = 'google' | 'kakao' | null;

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  fcmToken: string | null;
  serialCode: string | null;
  recentLogin: SocialLoginProvider;
  handleLogin: () => void;
  handleLogout: () => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setFcmToken: (token: string) => void;
  setSerialCode: (code: string) => void;
  setRecentLogin: (provider: SocialLoginProvider) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      fcmToken: null,
      serialCode: null,
      recentLogin: null,
      handleLogin: () => set({ isLoggedIn: true }),
      handleLogout: () => {
        set({
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
          fcmToken: null,
          serialCode: null,
        });
      },
      setAccessToken: (token: string) => set({ accessToken: token }),
      setRefreshToken: (token: string) => set({ refreshToken: token }),
      setFcmToken: (token: string) => set({ fcmToken: token }),
      setSerialCode: (code: string) => set({ serialCode: code }),
      setRecentLogin: (provider: SocialLoginProvider) =>
        set({ recentLogin: provider }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
