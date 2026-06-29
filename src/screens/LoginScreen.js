import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Card, InputField, PrimaryButton, ScreenContainer } from '../components';
import colors from '../constants/colors';
import theme from '../constants/theme';
import { useUser } from '../context/UserContext';

export default function LoginScreen({ navigation }) {
  const { login, registeredCredentials } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const canLogin = username.trim().length > 2 && password.trim().length > 4;

  async function handleLogin() {
    const successful = await login({ username, password });
    if (!successful) {
      setLoginError('Username or password is incorrect.');
      return;
    }
    setLoginError('');
  }

  return (
    <ScreenContainer scroll>
      <View style={styles.hero}>
        <View style={styles.logoBox}>
          <Ionicons name="lock-closed-outline" size={36} color={colors.primary} />
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue to your AI Life Advisor dashboard.</Text>
      </View>

      <Card>
        <InputField
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          keyboardType="default"
        />
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          keyboardType="default"
          secureTextEntry
        />
        <PrimaryButton
          title="Log In"
          icon="log-in-outline"
          onPress={handleLogin}
          disabled={!canLogin}
        />
        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
        {registeredCredentials ? (
          <Text style={styles.infoText}>
            Stored username: @{registeredCredentials.username}
          </Text>
        ) : (
          <Text style={styles.infoText}>No account found. Please sign up first.</Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Onboarding')} style={styles.switchAction}>
          <Text style={styles.switchText}>New here? Sign up instead</Text>
        </TouchableOpacity>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  logoBox: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  switchAction: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  switchText: {
    color: colors.primary,
    fontWeight: '600',
  },
  errorText: {
    color: colors.danger,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  infoText: {
    color: colors.textSecondary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
});
