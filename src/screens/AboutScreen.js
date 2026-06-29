import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Card, ScreenContainer, SectionHeader } from '../components';
import colors from '../constants/colors';
import theme from '../constants/theme';

const FEATURES = [
  { icon: 'wallet-outline', title: 'Finance Tracking', desc: 'Monitor income, expenses, and savings' },
  { icon: 'sparkles-outline', title: 'AI Advisor', desc: 'Get personalized career and spending advice' },
  { icon: 'briefcase-outline', title: 'Career Matching', desc: 'Discover careers aligned with your skills' },
  { icon: 'trending-up-outline', title: 'Future Planning', desc: 'Plan your financial and career goals' },
];

export default function AboutScreen() {
  return (
    <ScreenContainer scroll>
      <View style={styles.hero}>
        <View style={styles.logoBox}>
          <Ionicons name="sparkles" size={36} color={colors.primary} />
        </View>
        <Text style={styles.appName}>AI Life Advisor</Text>
        <Text style={styles.tagline}>Your personal growth companion</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <Card>
        <Text style={styles.description}>
          AI Life Advisor analyzes your financial situation, interests, skills, and goals
          to provide personalized advice about spending habits, career options, and future
          planning — helping you make smarter life decisions.
        </Text>
      </Card>

      <SectionHeader title="Features" icon="grid-outline" />
      {FEATURES.map((feature) => (
        <Card key={feature.title} style={styles.featureCard}>
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons name={feature.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          </View>
        </Card>
      ))}

      <Text style={styles.footer}>Built with React Native & Expo</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  appName: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  tagline: {
    fontSize: theme.fontSize.md,
    color: colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  version: {
    fontSize: theme.fontSize.xs,
    color: colors.textMuted,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  featureCard: {
    paddingVertical: theme.spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: theme.fontSize.sm,
    color: colors.textSecondary,
  },
  footer: {
    textAlign: 'center',
    fontSize: theme.fontSize.xs,
    color: colors.textMuted,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
});
