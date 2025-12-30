import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, Card } from '@/components/ui';
import { Header, BodyContainer } from '@/components/layout';
import { useUserStore } from '@/store';
import { useTheme } from '@/hooks';
import { SPACING, FONT_SIZE, COLORS, BORDER_RADIUS } from '@/constants';
import { APP_NAME, APP_VERSION } from '@/constants';

export const SettingsScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
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

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    rightElement?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.settingIcon, { backgroundColor: `${COLORS.primary}15` }]}>
        <Ionicons name={icon as any} size={20} color={COLORS.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        )}
      </View>
      {rightElement || (
        onPress && <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <Header username="John Doe" />
      
      <BodyContainer style={styles.body}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Appearance */}
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>APPEARANCE</Text>
          <Card style={styles.settingsCard} variant="filled">
            {renderSettingItem(
              'moon',
              'Dark Mode',
              theme === 'system' ? 'Following system' : isDark ? 'On' : 'Off',
              <Switch
                value={isDark}
                onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
                trackColor={{ false: colors.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            )}
            {renderSettingItem(
              'phone-portrait',
              'Follow System Theme',
              'Use device appearance settings',
              <Switch
                value={theme === 'system'}
                onValueChange={(value) => setTheme(value ? 'system' : isDark ? 'dark' : 'light')}
                trackColor={{ false: colors.border, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            )}
          </Card>

          {/* Data */}
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>DATA</Text>
          <Card style={styles.settingsCard} variant="filled">
            {renderSettingItem(
              'time',
              'Clear Recent Tools',
              'Remove your recent tools history',
              undefined,
              handleClearRecent
            )}
          </Card>

          {/* About */}
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ABOUT</Text>
          <Card style={styles.settingsCard} variant="filled">
            {renderSettingItem(
              'information-circle',
              'App Version',
              APP_VERSION
            )}
            {renderSettingItem(
              'logo-github',
              'Source Code',
              'View on GitHub',
              undefined,
              () => {}
            )}
            {renderSettingItem(
              'star',
              'Rate App',
              'Leave a review',
              undefined,
              () => {}
            )}
          </Card>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              {APP_NAME} v{APP_VERSION}
            </Text>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              Made with ❤️
            </Text>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </BodyContainer>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
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
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: FONT_SIZE.sm,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    gap: SPACING.xs,
  },
  footerText: {
    fontSize: FONT_SIZE.sm,
  },
  bottomPadding: {
    height: SPACING.xl,
  },
});
