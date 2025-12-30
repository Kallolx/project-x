import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen, ToolsScreen, SettingsScreen, JobsScreen, DocsScreen, FilesScreen, MoreScreen } from '@/screens';
import { MainTabParamList } from '@/types';
import { useTheme } from '@/hooks';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '@/constants';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Jobs':
              iconName = focused ? 'briefcase' : 'briefcase-outline';
              break;
            case 'Docs':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            case 'Files':
              iconName = focused ? 'folder' : 'folder-outline';
              break;
            case 'More':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: FONT_SIZE.xs,
          fontWeight: '500',
          marginTop: -2,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 95 : 75,
          paddingTop: SPACING.sm,
          paddingBottom: Platform.OS === 'ios' ? SPACING.xl : SPACING.lg,
        },
        tabBarItemStyle: {
          paddingVertical: SPACING.xs,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: colors.text,
          fontWeight: '600',
          fontSize: FONT_SIZE.lg,
        },
        headerTintColor: colors.text,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Jobs" 
        component={JobsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Docs" 
        component={DocsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Files" 
        component={FilesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
