import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Card, Input } from '@/components/ui';
import { ToolCard } from '@/components/tools';
import { useToolsStore, useUserStore } from '@/store';
import { useTheme } from '@/hooks';
import { SPACING, FONT_SIZE, COLORS } from '@/constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types';

export const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { tools } = useToolsStore();
  const { favoriteTools, recentTools, addFavoriteTool, removeFavoriteTool, addRecentTool, isFavorite } = useUserStore();

  const favoriteToolsList = tools.filter((tool) => favoriteTools.includes(tool.id));
  const recentToolsList = tools.filter((tool) => recentTools.includes(tool.id)).slice(0, 4);

  const handleToolPress = (toolId: string) => {
    addRecentTool(toolId);
    navigation.navigate('ToolDetail', { toolId });
  };

  const handleToggleFavorite = (toolId: string) => {
    if (isFavorite(toolId)) {
      removeFavoriteTool(toolId);
    } else {
      addFavoriteTool(toolId);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome to</Text>
          <Text style={[styles.title, { color: colors.text }]}>Project X</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Ionicons name="apps" size={24} color={COLORS.primary} />
            <Text style={[styles.statNumber, { color: colors.text }]}>{tools.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Tools</Text>
          </Card>
          <Card style={styles.statCard}>
            <Ionicons name="heart" size={24} color={COLORS.error} />
            <Text style={[styles.statNumber, { color: colors.text }]}>{favoriteTools.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Favorites</Text>
          </Card>
        </View>

        {/* Recent Tools */}
        {recentToolsList.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Tools</Text>
            {recentToolsList.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onPress={() => handleToolPress(tool.id)}
                isFavorite={isFavorite(tool.id)}
                onToggleFavorite={() => handleToggleFavorite(tool.id)}
              />
            ))}
          </View>
        )}

        {/* Favorite Tools */}
        {favoriteToolsList.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Favorites</Text>
            {favoriteToolsList.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onPress={() => handleToolPress(tool.id)}
                isFavorite={true}
                onToggleFavorite={() => handleToggleFavorite(tool.id)}
              />
            ))}
          </View>
        )}

        {/* All Tools Preview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>All Tools</Text>
          {tools.slice(0, 3).map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onPress={() => handleToolPress(tool.id)}
              isFavorite={isFavorite(tool.id)}
              onToggleFavorite={() => handleToggleFavorite(tool.id)}
            />
          ))}
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
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: FONT_SIZE.md,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  statNumber: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  bottomPadding: {
    height: SPACING.xxl,
  },
});
