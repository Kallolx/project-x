import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants';
import { useTheme } from '@/hooks';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'filled';
  onPress?: TouchableOpacityProps['onPress'];
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated',
  onPress,
}) => {
  const { colors } = useTheme();

  const cardStyle = [
    styles.base,
    variant === 'elevated' && [styles.elevated, SHADOWS.md],
    variant === 'outlined' && [styles.outlined, { borderColor: colors.border }],
    variant === 'filled' && styles.filled,
    { backgroundColor: colors.surface },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  elevated: {
    // Shadow styles are applied via SHADOWS.md
  },
  outlined: {
    borderWidth: 1,
  },
  filled: {
    // Just uses background color
  },
});
