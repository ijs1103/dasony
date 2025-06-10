import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SocialLoginProvider = 'google' | 'kakao' | null;

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  fcmToken: string | null;
  phoneNumber: string | null;
  guardianName: string | null;
  guardianPhoneNumber: string | null;
  seniorAddress: string | null;
  serialCode: string | null;
  recentLogin: SocialLoginProvider;
  handleLogin: () => void;
  handleLogout: () => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setFcmToken: (token: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setSerialCode: (code: string) => void;
  setRecentLogin: (provider: SocialLoginProvider) => void;
  setGuardianInfo: (name: string | null, phoneNumber: string | null) => void;
  setSeniorAddress: (address: string | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      fcmToken: null,
      phoneNumber: null,
      guardianName: null,
      guardianPhoneNumber: null,
      seniorAddress: null,
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
          phoneNumber: null,
        });
      },
      setAccessToken: (token: string) => set({ accessToken: token }),
      setRefreshToken: (token: string) => set({ refreshToken: token }),
      setFcmToken: (token: string) => set({ fcmToken: token }),
      setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),
      setSerialCode: (code: string) => set({ serialCode: code }),
      setGuardianInfo: (name: string | null, phoneNumber: string | null) =>
        set({ guardianName: name, guardianPhoneNumber: phoneNumber }),
      setSeniorAddress: (address: string | null) =>
        set({ seniorAddress: address }),
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
