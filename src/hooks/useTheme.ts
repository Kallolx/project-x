import { useColorScheme } from 'react-native';
import { useUserStore } from '@/store';
import { COLORS } from '@/constants';

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const { theme } = useUserStore();

  const isDark =
    theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';

  const colors = {
    primary: COLORS.primary,
    primaryLight: COLORS.primaryLight,
    primaryDark: COLORS.primaryDark,
    secondary: COLORS.secondary,
    background: isDark ? COLORS.backgroundDark : COLORS.background,
    surface: isDark ? COLORS.surfaceDark : COLORS.surface,
    text: isDark ? COLORS.white : COLORS.gray900,
    textSecondary: isDark ? COLORS.gray400 : COLORS.gray500,
    border: isDark ? COLORS.gray700 : COLORS.gray200,
    success: COLORS.success,
    warning: COLORS.warning,
    error: COLORS.error,
    info: COLORS.info,
  };

  return {
    isDark,
    colors,
  };
};
