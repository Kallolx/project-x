import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabScreenLayout } from '@/components/layout';
import { useTheme } from '@/hooks';
import { SPACING, FONT_SIZE, COLORS } from '@/constants';

export const JobsScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <TabScreenLayout>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.emptyState}>
          <View style={[styles.iconContainer, { backgroundColor: `${COLORS.primary}15` }]}>
            <Ionicons name="briefcase-outline" size={48} color={COLORS.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Jobs</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your jobs and tasks will appear here
          </Text>
        </View>
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
    paddingTop: SPACING.xl,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
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
    fontSize: FONT_SIZE.xl,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
  },
});
