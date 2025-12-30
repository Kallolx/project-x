import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tool, UserPreferences, AppState } from '@/types';

// App Store - Global app state
interface AppStore extends AppState {
  setIsLoading: (loading: boolean) => void;
  setIsFirstLaunch: (isFirst: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isLoading: false,
      isFirstLaunch: true,
      setIsLoading: (loading) => set({ isLoading: loading }),
      setIsFirstLaunch: (isFirst) => set({ isFirstLaunch: isFirst }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
