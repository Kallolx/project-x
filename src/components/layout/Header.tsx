import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '@/hooks';
import { SPACING, FONT_SIZE, COLORS, SHADOWS } from '@/constants';

interface HeaderProps {
  username?: string;
  avatarUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  username = 'User',
  avatarUrl,
}) => {
  const { colors } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.leftSection}>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>
          {getGreeting()} 🎉
        </Text>
        <Text style={[styles.username, { color: colors.text }]}>{username}</Text>
      </View>

      <TouchableOpacity
        style={[styles.avatarContainer, { backgroundColor: colors.surface }]}
        activeOpacity={0.7}
      >
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: COLORS.primary }]}>
            <Text style={styles.avatarInitial}>
              {username.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingTop: SPACING.sm,
  },
  leftSection: {
    flex: 1,
  },
  greeting: {
    fontSize: FONT_SIZE.sm,
    marginBottom: 2,
  },
  username: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
  },
});