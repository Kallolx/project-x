import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Input, Badge } from '@/components/ui';
import { ToolCard } from '@/components/tools';
import { useToolsStore, useUserStore } from '@/store';
import { useTheme, useDebounce } from '@/hooks';
import { SPACING, FONT_SIZE, COLORS, BORDER_RADIUS } from '@/constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, ToolCategory } from '@/types';
import { capitalize } from '@/utils';

const categories: (ToolCategory | 'all')[] = ['all', 'productivity', 'utilities', 'conversion', 'generator', 'other'];

export const ToolsScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { tools, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useToolsStore();
  const { addFavoriteTool, removeFavoriteTool, addRecentTool, isFavorite } = useUserStore();

  const debouncedSetSearch = useDebounce(setSearchQuery, 300);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tools, searchQuery, selectedCategory]);

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
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Tools</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {filteredTools.length} tools available
          </Text>
        </View>

        {/* Search */}
        <Input
          placeholder="Search tools..."
          defaultValue={searchQuery}
          onChangeText={debouncedSetSearch}
          leftIcon={<Ionicons name="search" size={20} color={colors.textSecondary} />}
          containerStyle={styles.searchInput}
        />

        {/* Categories */}
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                {
                  backgroundColor: selectedCategory === item ? COLORS.primary : colors.surface,
                  borderColor: selectedCategory === item ? COLORS.primary : colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory === item ? COLORS.white : colors.text },
                ]}
              >
                {capitalize(item)}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Tools List */}
        <FlatList
          data={filteredTools}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.toolsList}
          renderItem={({ item }) => (
            <ToolCard
              tool={item}
              onPress={() => handleToolPress(item.id)}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={() => handleToggleFavorite(item.id)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color={colors.textSecondary} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No tools found
              </Text>
            </View>
          }
        />
      </View>
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
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    marginTop: SPACING.xs,
  },
  searchInput: {
    marginBottom: SPACING.md,
  },
  categoriesList: {
    maxHeight: 44,
    marginBottom: SPACING.md,
  },
  categoriesContent: {
    gap: SPACING.sm,
  },
  categoryChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
  toolsList: {
    paddingBottom: SPACING.xxl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    marginTop: SPACING.md,
  },
});
