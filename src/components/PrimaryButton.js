import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../constants/colors';
import theme from '../constants/theme';

export default function PrimaryButton({
  title,
  onPress,
  icon,
  loading = false,
  variant = 'primary',
  disabled = false,
}) {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isOutline ? styles.outline : styles.primary,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.surface} />
      ) : (
        <>
          {icon ? (
            <Ionicons
              name={icon}
              size={20}
              color={isOutline ? colors.primary : colors.surface}
              style={styles.icon}
            />
          ) : null}
          <Text style={[styles.text, isOutline ? styles.outlineText : styles.primaryText]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.sm,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.surface,
  },
  outlineText: {
    color: colors.primary,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
});
