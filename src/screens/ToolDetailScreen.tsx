import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { ScreenContainer, Button, Badge, Card } from '@/components/ui';
import { useToolsStore, useUserStore } from '@/store';
import { useTheme } from '@/hooks';
import { SPACING, FONT_SIZE, COLORS, BORDER_RADIUS } from '@/constants';
import { RootStackParamList } from '@/types';
import { capitalize } from '@/utils';

type ToolDetailRouteProp = RouteProp<RootStackParamList, 'ToolDetail'>;

export const ToolDetailScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<ToolDetailRouteProp>();
  const { toolId } = route.params;

  const { getToolById } = useToolsStore();
  const { isFavorite, addFavoriteTool, removeFavoriteTool } = useUserStore();

  const tool = getToolById(toolId);
  const favorite = isFavorite(toolId);

  if (!tool) {
    return (
      <ScreenContainer>
        <View style={styles.notFound}>
          <Ionicons name="alert-circle" size={64} color={colors.textSecondary} />
          <Text style={[styles.notFoundText, { color: colors.text }]}>Tool not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} style={styles.goBackButton} />
        </View>
      </ScreenContainer>
    );
  }

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavoriteTool(toolId);
    } else {
      addFavoriteTool(toolId);
    }
  };

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
    <ScreenContainer edges={['bottom']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Tool Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${COLORS.primary}15` }]}>
            <Ionicons name={tool.icon as any} size={48} color={COLORS.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{tool.name}</Text>
          <Badge label={capitalize(tool.category)} variant={getCategoryBadgeVariant()} />
        </View>

        {/* Description */}
        <Card style={styles.descriptionCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {tool.description}
          </Text>
        </Card>

        {/* Tool Content Placeholder */}
        <Card style={styles.toolContent}>
          <View style={styles.placeholder}>
            <Ionicons name="construct" size={48} color={colors.textSecondary} />
            <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
              Tool interface will be implemented here
            </Text>
            <Text style={[styles.placeholderSubtext, { color: colors.textSecondary }]}>
              Each tool will have its own unique functionality
            </Text>
          </View>
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            variant={favorite ? 'outline' : 'primary'}
            fullWidth
            onPress={handleToggleFavorite}
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  descriptionCard: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZE.md,
    lineHeight: 24,
  },
  toolContent: {
    marginBottom: SPACING.md,
    minHeight: 200,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
  placeholderText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: FONT_SIZE.sm,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  actions: {
    gap: SPACING.sm,
  },
  bottomPadding: {
    height: SPACING.xxl,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  notFoundText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '600',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  goBackButton: {
    minWidth: 120,
  },
});
