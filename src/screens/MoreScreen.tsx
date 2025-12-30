import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui';
import { TabScreenLayout } from '@/components/layout';
import { useUserStore } from '@/store';
import { useTheme } from '@/hooks';
import { SPACING, FONT_SIZE, COLORS, BORDER_RADIUS } from '@/constants';
import { APP_NAME, APP_VERSION } from '@/constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types';

export const MoreScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, setTheme, clearRecentTools } = useUserStore();

  const handleClearRecent = () => {
    Alert.alert(
      'Clear Recent Tools',
      'Are you sure you want to clear your recent tools history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearRecentTools },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'apps-outline',
      label: 'All Tools',
      subtitle: 'Browse all available tools',
      color: COLORS.primary,
      onPress: () => {},
    },
    {
      icon: 'heart-outline',
      label: 'Favorites',
      subtitle: 'Your favorite tools',
      color: COLORS.error,
      onPress: () => {},
    },
    {
      icon: 'time-outline',
      label: 'Recent',
      subtitle: 'Recently used tools',
      color: COLORS.info,
      onPress: () => {},
    },
    {
      icon: 'settings-outline',
      label: 'Settings',
      subtitle: 'App preferences',
      color: COLORS.gray500,
      onPress: () => {},
    },
  ];

  const renderMenuItem = (
    icon: string,
    label: string,
    subtitle: string,
    color: string,
    onPress: () => void
  ) => (
    <TouchableOpacity
      key={label}
      style={[styles.menuItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIcon, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon as any} size={22} color={color} />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuLabel, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <TabScreenLayout>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Menu Items */}
        <Card style={styles.menuCard} variant="filled">
          {menuItems.map((item) => 
            renderMenuItem(item.icon, item.label, item.subtitle, item.color, item.onPress)
          )}
        </Card>

        {/* Theme Toggle */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>APPEARANCE</Text>
        <Card style={styles.settingsCard} variant="filled">
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={[styles.menuIcon, { backgroundColor: `${COLORS.primary}15` }]}>
              <Ionicons name="moon-outline" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuLabel, { color: colors.text }]}>Dark Mode</Text>
              <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>
                {theme === 'system' ? 'Following system' : isDark ? 'On' : 'Off'}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
              trackColor={{ false: colors.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </Card>

        {/* About */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ABOUT</Text>
        <Card style={styles.settingsCard} variant="filled">
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={[styles.menuIcon, { backgroundColor: `${COLORS.info}15` }]}>
              <Ionicons name="information-circle-outline" size={22} color={COLORS.info} />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuLabel, { color: colors.text }]}>Version</Text>
              <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>{APP_VERSION}</Text>
            </View>
          </View>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            {APP_NAME} v{APP_VERSION}
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
    paddingTop: SPACING.lg,
  },
  menuCard: {
    padding: 0,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: FONT_SIZE.sm,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
    letterSpacing: 0.5,
  },
  settingsCard: {
    padding: 0,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  footerText: {
    fontSize: FONT_SIZE.sm,
  },
});
