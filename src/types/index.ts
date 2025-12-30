// Navigation Types
export type RootStackParamList = {
  MainTabs: undefined;
  ToolDetail: { toolId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Jobs: undefined;
  Docs: undefined;
  Files: undefined;
  More: undefined;
};

// Tool Types
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  isEnabled: boolean;
}

export type ToolCategory = 
  | 'productivity'
  | 'utilities'
  | 'conversion'
  | 'generator'
  | 'other';

// User Preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  favoriteTools: string[];
  recentTools: string[];
}

// App State
export interface AppState {
  isLoading: boolean;
  isFirstLaunch: boolean;
}
