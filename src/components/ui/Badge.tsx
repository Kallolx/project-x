import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
  style,
}) => {
  return (
    <View style={[styles.base, styles[variant], styles[`size_${size}`], style]}>
      <Text style={[styles.text, styles[`text_${variant}`], styles[`text_${size}`]]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: COLORS.gray200,
  },
  success: {
    backgroundColor: `${COLORS.success}20`,
  },
  warning: {
    backgroundColor: `${COLORS.warning}20`,
  },
  error: {
    backgroundColor: `${COLORS.error}20`,
  },
  info: {
    backgroundColor: `${COLORS.info}20`,
  },
  size_sm: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
  },
  size_md: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  text: {
    fontWeight: '500',
  },
  text_default: {
    color: COLORS.gray700,
  },
  text_success: {
    color: COLORS.success,
  },
  text_warning: {
    color: COLORS.warning,
  },
  text_error: {
    color: COLORS.error,
  },
  text_info: {
    color: COLORS.info,
  },
  text_sm: {
    fontSize: FONT_SIZE.xs,
  },
  text_md: {
    fontSize: FONT_SIZE.sm,
  },
});
