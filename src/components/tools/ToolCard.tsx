import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Badge } from '@/components/ui';
import { Tool } from '@/types';
import { COLORS, SPACING, FONT_SIZE } from '@/constants';
import { useTheme } from '@/hooks';
import { capitalize } from '@/utils';

interface ToolCardProps {
  tool: Tool;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onPress,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const { colors } = useTheme();

  const getCategoryBadgeVariant = () => {
    switch (tool.category) {
      case 'productivity':
        return 'success';
      case 'utilities':
        return 'info';
      case 'conversion':
        return 'warning';
      case 'generator':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${COLORS.primary}15` }]}>
          <Ionicons name={tool.icon as any} size={24} color={COLORS.primary} />
        </View>
        {onToggleFavorite && (
          <TouchableOpacity onPress={onToggleFavorite} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavorite ? COLORS.error : colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>{tool.name}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
        {tool.description}
      </Text>
      
      <View style={styles.footer}>
        <Badge label={capitalize(tool.category)} variant={getCategoryBadgeVariant()} size="sm" />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
