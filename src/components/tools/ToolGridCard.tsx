import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { SPACING, FONT_SIZE, COLORS, BORDER_RADIUS, SHADOWS } from '@/constants';
import { Tool } from '@/types';

interface ToolGridCardProps {
  tool: Tool;
  onPress: () => void;
  style?: ViewStyle;
}

export const ToolGridCard: React.FC<ToolGridCardProps> = ({
  tool,
  onPress,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: colors.surface },
          SHADOWS.md,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${COLORS.primary}15` }]}>
          <Ionicons name={tool.icon as any} size={32} color={COLORS.primary} />
        </View>
      </TouchableOpacity>
      <Text
        style={[styles.toolName, { color: colors.text }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {tool.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
});
