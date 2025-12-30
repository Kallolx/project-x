import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserPreferences } from '@/types';

interface UserStore extends UserPreferences {
  // Actions
  setTheme: (theme: UserPreferences['theme']) => void;
  addFavoriteTool: (toolId: string) => void;
  removeFavoriteTool: (toolId: string) => void;
  addRecentTool: (toolId: string) => void;
  clearRecentTools: () => void;
  isFavorite: (toolId: string) => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      favoriteTools: [],
      recentTools: [],

      setTheme: (theme) => set({ theme }),

      addFavoriteTool: (toolId) => {
        const { favoriteTools } = get();
        if (!favoriteTools.includes(toolId)) {
          set({ favoriteTools: [...favoriteTools, toolId] });
        }
      },

      removeFavoriteTool: (toolId) => {
        const { favoriteTools } = get();
        set({ favoriteTools: favoriteTools.filter((id) => id !== toolId) });
      },

      addRecentTool: (toolId) => {
        const { recentTools } = get();
        const filtered = recentTools.filter((id) => id !== toolId);
        // Keep only last 10 recent tools
        const updated = [toolId, ...filtered].slice(0, 10);
        set({ recentTools: updated });
      },

      clearRecentTools: () => set({ recentTools: [] }),

      isFavorite: (toolId) => {
        const { favoriteTools } = get();
        return favoriteTools.includes(toolId);
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
