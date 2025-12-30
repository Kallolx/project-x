export * from './theme';

export const APP_NAME = 'Project X';
export const APP_VERSION = '1.0.0';

// Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: '@user_preferences',
  APP_STATE: '@app_state',
  TOOLS_DATA: '@tools_data',
} as const;

// API Configuration (for future use)
export const API_CONFIG = {
  BASE_URL: '',
  TIMEOUT: 10000,
} as const;
