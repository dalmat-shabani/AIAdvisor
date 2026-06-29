import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors';
import theme from '../constants/theme';
import Card from './Card';

export default function StatCard({ label, value, icon, color = colors.primary }) {
  return (
    <Card style={styles.statCard}>
      <View style={[styles.iconBox, { backgroundColor: color + '18' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 0,
    marginHorizontal: 4,
    paddingVertical: theme.spacing.lg,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  value: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  label: {
    fontSize: theme.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
