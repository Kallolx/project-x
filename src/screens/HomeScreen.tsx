import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui';
import { ToolGridCard } from '@/components/tools';
import { TabScreenLayout } from '@/components/layout';
import { useToolsStore, useUserStore } from '@/store';
import { useTheme } from '@/hooks';
import { SPACING, FONT_SIZE, COLORS } from '@/constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Tool } from '@/types';

export const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { tools } = useToolsStore();
  const { favoriteTools, recentTools, addRecentTool } = useUserStore();

  const recentToolsList = tools.filter((tool) => recentTools.includes(tool.id)).slice(0, 4);

  const handleToolPress = (toolId: string) => {
    addRecentTool(toolId);
    navigation.navigate('ToolDetail', { toolId });
  };

  const renderToolGrid = (toolsList: Tool[], title: string) => {
    if (toolsList.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
        <View style={styles.toolsGrid}>
          {toolsList.map((tool) => (
            <View key={tool.id} style={styles.gridItem}>
              <ToolGridCard
                tool={tool}
                onPress={() => handleToolPress(tool.id)}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <TabScreenLayout>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { backgroundColor: `${COLORS.primary}10` }]} variant="filled">
            <View style={styles.statIconContainer}>
              <Ionicons name="apps" size={20} color={COLORS.primary} />
            </View>
            <Text style={[styles.statNumber, { color: colors.text }]}>{tools.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Tools</Text>
          </Card>
          <Card style={[styles.statCard, { backgroundColor: `${COLORS.error}10` }]} variant="filled">
            <View style={[styles.statIconContainer, { backgroundColor: `${COLORS.error}20` }]}>
              <Ionicons name="heart" size={20} color={COLORS.error} />
            </View>
            <Text style={[styles.statNumber, { color: colors.text }]}>{favoriteTools.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Favorites</Text>
          </Card>
        </View>

        {/* Recent Tools */}
        {renderToolGrid(recentToolsList, 'Recent Tools')}

        {/* All Tools */}
        {renderToolGrid(tools, 'All Tools')}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </TabScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  statNumber: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.sm,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  bottomPadding: {
    height: SPACING.xl,
  },
});
