import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Memo } from '../types/memo';

interface MemoState {
  memos: Memo[];
  addMemo: (memo: Memo) => void;
  deleteMemo: (id: string) => void;
}

const useMemoStore = create<MemoState>()(
  persist(
    (set, get) => ({
      memos: [],
      addMemo: (memo: Memo) => {
        set(state => ({ memos: [...state.memos, memo] }));
      },
      deleteMemo: (id: string) => {
        set(state => ({ memos: state.memos.filter(memo => memo.id !== id) }));
      },
    }),
    {
      name: 'memo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useMemoStore;
