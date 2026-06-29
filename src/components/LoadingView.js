import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors';
import theme from '../constants/theme';

export default function LoadingView({ message = 'Loading...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  message: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.sm,
    color: colors.textSecondary,
  },
});
