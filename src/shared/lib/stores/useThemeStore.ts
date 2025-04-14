import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      isDarkTheme: false,
      toggleTheme: () =>
        set((state: { isDarkTheme: boolean }) => ({
          isDarkTheme: !state.isDarkTheme,
        })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useThemeStore;
