import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SocialLoginProvider = 'google' | 'kakao' | null;

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  recentLogin: SocialLoginProvider;
  login: () => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setRecentLogin: (provider: SocialLoginProvider) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      recentLogin: null,
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({ isLoggedIn: false, accessToken: null, refreshToken: null }),
      setAccessToken: (token: string) => set({ accessToken: token }),
      setRefreshToken: (token: string) => set({ refreshToken: token }),
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
