import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PermissionState {
  isAllGranted: boolean;
  setAllGranted: (granted: boolean) => void;
}

const usePermissionStore = create<PermissionState>()(
  persist(
    set => ({
      isAllGranted: false,
      setAllGranted: (granted: boolean) => set({ isAllGranted: granted }),
    }),
    {
      name: 'permission-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default usePermissionStore;
