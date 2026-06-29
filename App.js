import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoadingView } from './src/components';
import { UserProvider, useUser } from './src/context/UserContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import RootNavigator from './src/navigation/RootNavigator';
import colors from './src/constants/colors';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AppContent() {
  const { hasCompletedOnboarding, isReady } = useUser();

  if (!isReady) {
    return (
      <View style={styles.boot}>
        <LoadingView message="Loading AI Life Advisor..." />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        {hasCompletedOnboarding ? <RootNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  boot: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
