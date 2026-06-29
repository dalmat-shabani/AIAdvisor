import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../constants/colors';
import theme from '../constants/theme';
import Card from './Card';

export default function RecommendationSlide({ item }) {
  return (
    <Card style={styles.slide}>
      <View style={[styles.iconBox, { backgroundColor: item.color + '18' }]}>
        <Ionicons name={item.icon} size={28} color={item.color} />
      </View>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </Card>
  );
}

export function CareerListItem({ item, onPress, matchScore }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.careerCard}>
        <View style={styles.careerRow}>
          <View style={styles.careerIconBox}>
            <Ionicons name={item.icon} size={24} color={colors.primary} />
          </View>
          <View style={styles.careerInfo}>
            <Text style={styles.careerTitle}>{item.title}</Text>
            <Text style={styles.careerCategory}>{item.category}</Text>
            <Text style={styles.careerSalary}>{item.salaryRange}</Text>
          </View>
          <View style={styles.careerMeta}>
            {matchScore != null ? (
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{matchScore}%</Text>
              </View>
            ) : null}
            <View style={[styles.growthBadge, getGrowthStyle(item.growth)]}>
              <Text style={styles.growthText}>{item.growth}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

function getGrowthStyle(growth) {
  if (growth === 'Very High' || growth === 'High') return styles.growthHigh;
  return styles.growthModerate;
}

const styles = StyleSheet.create({
  slide: {
    minHeight: 180,
    marginBottom: 0,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  type: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: theme.spacing.sm,
  },
  message: {
    fontSize: theme.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  careerCard: {
    paddingVertical: theme.spacing.md,
  },
  careerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  careerIconBox: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  careerInfo: {
    flex: 1,
  },
  careerTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  careerCategory: {
    fontSize: theme.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  careerSalary: {
    fontSize: theme.fontSize.sm,
    color: colors.success,
    fontWeight: '600',
  },
  careerMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  matchBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    marginBottom: 4,
  },
  matchText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '700',
    color: colors.primary,
  },
  growthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    marginBottom: 4,
  },
  growthHigh: {
    backgroundColor: colors.successLight,
  },
  growthModerate: {
    backgroundColor: colors.warningLight,
  },
  growthText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
