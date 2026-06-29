import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../constants/colors';
import theme from '../constants/theme';

export default function ExpenseCategoryRow({ category, onDelete }) {
  return (
    <View style={styles.row}>
      <View style={[styles.iconBox, { backgroundColor: category.color + '18' }]}>
        <Ionicons name={category.icon} size={18} color={category.color} />
      </View>
      <View style={styles.info}>
        <View style={styles.labelRow}>
          <Text style={styles.name}>{category.name}</Text>
          <Text style={styles.amount}>${category.amount}</Text>
        </View>
        <View style={styles.barTrack}>
          <View
            style={[
              styles.barFill,
              { width: `${category.percent}%`, backgroundColor: category.color },
            ]}
          />
        </View>
        <Text style={styles.percent}>{category.percent}% of expenses</Text>
      </View>
      {onDelete ? (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(category.id)}
          activeOpacity={0.7}>
          <Ionicons name="trash-outline" size={18} color={colors.danger} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  info: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: colors.text,
  },
  amount: {
    fontSize: theme.fontSize.sm,
    fontWeight: '700',
    color: colors.text,
  },
  barTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  percent: {
    fontSize: theme.fontSize.xs,
    color: colors.textMuted,
  },
  deleteButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
});
