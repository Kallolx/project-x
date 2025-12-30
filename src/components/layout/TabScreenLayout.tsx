import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer } from '@/components/ui';
import { Header, BodyContainer } from '@/components/layout';
import { useTheme } from '@/hooks';

interface TabScreenLayoutProps {
  children: React.ReactNode;
}

export const TabScreenLayout: React.FC<TabScreenLayoutProps> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <Header username="Kamrul Hasan" />
      <BodyContainer style={styles.body}>
        {children}
      </BodyContainer>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
