import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Card, PrimaryButton, ScreenContainer, SectionHeader } from '../components';
import colors from '../constants/colors';
import theme from '../constants/theme';

export default function CareerDetailsScreen({ route, navigation }) {
  const { career } = route.params;

  return (
    <ScreenContainer scroll>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name={career.icon} size={32} color={colors.primary} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.category}>{career.category}</Text>
          <Text style={styles.title}>{career.title}</Text>
          <Text style={styles.salary}>{career.salaryRange}</Text>
        </View>
      </View>

      <View style={styles.badges}>
        <Badge label="Growth" value={career.growth} color={colors.success} />
        {career.matchScore > 0 ? (
          <Badge label="Your Match" value={`${career.matchScore}%`} color={colors.primary} />
        ) : null}
      </View>

      <SectionHeader title="Overview" />
      <Card>
        <Text style={styles.description}>{career.description}</Text>
      </Card>

      <SectionHeader title="Required Skills" icon="construct-outline" />
      <Card>
        <View style={styles.skillsRow}>
          {career.skills.map((skill) => (
            <View key={skill} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </Card>

      <SectionHeader title="Education" icon="school-outline" />
      <Card>
        <Text style={styles.bodyText}>{career.education}</Text>
      </Card>

      <SectionHeader title="Job Outlook" icon="trending-up-outline" />
      <Card>
        <Text style={styles.bodyText}>{career.outlook}</Text>
      </Card>

      <PrimaryButton
        title="Explore More Careers"
        icon="arrow-back"
        variant="outline"
        onPress={() => navigation.goBack()}
      />
    </ScreenContainer>
  );
}

function Badge({ label, value, color }) {
  return (
    <View style={[styles.badge, { backgroundColor: color + '18' }]}>
      <Text style={[styles.badgeLabel, { color }]}>{label}</Text>
      <Text style={[styles.badgeValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  category: {
    fontSize: theme.fontSize.xs,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  salary: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: colors.success,
  },
  badges: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  badge: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  badgeLabel: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
    marginBottom: 2,
  },
  badgeValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
  },
  description: {
    fontSize: theme.fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  skillBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
  },
  skillText: {
    fontSize: theme.fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  bodyText: {
    fontSize: theme.fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
