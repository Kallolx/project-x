import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants';
import { useTheme } from '@/hooks';

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...props
}) => {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        containerStyle,
      ]}
    >
      {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
      <TextInput
        style={[
          styles.input,
          { color: colors.text },
          leftIcon ? styles.inputWithLeftIcon : undefined,
          rightIcon ? styles.inputWithRightIcon : undefined,
          style,
        ]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  inputWithLeftIcon: {
    paddingLeft: SPACING.xs,
  },
  inputWithRightIcon: {
    paddingRight: SPACING.xs,
  },
  iconContainer: {
    paddingHorizontal: SPACING.sm,
  },
});
