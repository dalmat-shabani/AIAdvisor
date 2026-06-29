import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from '../constants/colors';

export default function ScreenContainer({ children, scroll = false, style }) {
  const insets = useSafeAreaInsets();

  const content = (
    <View style={[styles.inner, style]}>
      {children}
    </View>
  );

  if (scroll) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 16 }]}
        showsVerticalScrollIndicator={false}>
        {content}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    padding: 16,
  },
});
