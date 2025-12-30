import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Input } from '@/components/ui';
import { ToolGridCard } from '@/components/tools';
import { Header, BodyContainer } from '@/components/layout';
import { useToolsStore, useUserStore } from '@/store';
import { useTheme, useDebounce } from '@/hooks';
import { SPACING, FONT_SIZE, COLORS, BORDER_RADIUS } from '@/constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, ToolCategory, Tool } from '@/types';
import { capitalize } from '@/utils';

const categories: (ToolCategory | 'all')[] = ['all', 'productivity', 'utilities', 'conversion', 'generator', 'other'];

export const ToolsScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { tools, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useToolsStore();
  const { addRecentTool } = useUserStore();

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

  const renderToolItem = ({ item, index }: { item: Tool; index: number }) => (
    <View style={[styles.gridItem, index % 2 === 1 && styles.gridItemRight]}>
      <ToolGridCard
        tool={item}
        onPress={() => handleToolPress(item.id)}
      />
    </View>
  );

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <Header username="John Doe" />
      
      <BodyContainer style={styles.body}>
        <View style={styles.content}>
          {/* Search */}
          <View style={styles.searchContainer}>
            <Input
              placeholder="Search tools..."
              defaultValue={searchQuery}
              onChangeText={debouncedSetSearch}
              leftIcon={<Ionicons name="search" size={20} color={colors.textSecondary} />}
            />
          </View>

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
                    backgroundColor: selectedCategory === item ? COLORS.primary : 'transparent',
                    borderColor: selectedCategory === item ? COLORS.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: selectedCategory === item ? COLORS.white : colors.textSecondary },
                  ]}
                >
                  {capitalize(item)}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Tools Grid */}
          <FlatList
            data={filteredTools}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.toolsList}
            renderItem={renderToolItem}
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
      </BodyContainer>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: SPACING.lg,
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  categoriesList: {
    maxHeight: 44,
    marginBottom: SPACING.lg,
  },
  categoriesContent: {
    paddingHorizontal: SPACING.lg,
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
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  gridItem: {
    flex: 1,
    paddingRight: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  gridItemRight: {
    paddingRight: 0,
    paddingLeft: SPACING.sm,
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
