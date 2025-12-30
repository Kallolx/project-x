import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks';
import { BORDER_RADIUS } from '@/constants';

interface BodyContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const BodyContainer: React.FC<BodyContainerProps> = ({
  children,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: BORDER_RADIUS.xl * 2,
    borderTopRightRadius: BORDER_RADIUS.xl * 2,
  },
});
