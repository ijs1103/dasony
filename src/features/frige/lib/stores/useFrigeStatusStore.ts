import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FrigeStatusState {
  isLifted: boolean;
  liftedCreatedAt: string | null;
  setIsLifted: (isLifted: boolean, createdAt: string) => void;
  resetLifted: () => void;
}

const useFrigeStatusStore = create<FrigeStatusState>()(
  persist(
    set => ({
      isLifted: false,
      liftedCreatedAt: null,
      setIsLifted: (isLifted, createdAt) =>
        set({ isLifted, liftedCreatedAt: createdAt }),
      resetLifted: () => set({ isLifted: false, liftedCreatedAt: null }),
    }),
    {
      name: 'frige-status-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useFrigeStatusStore;
