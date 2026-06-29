import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Card, InputField, PrimaryButton, ScreenContainer } from '../components';
import colors from '../constants/colors';
import theme from '../constants/theme';
import { useUser } from '../context/UserContext';

export default function OnboardingScreen({ navigation }) {
  const { completeOnboarding } = useUser();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [goals, setGoals] = useState('');
  const canContinue = name.trim().length > 1 && username.trim().length > 2 && password.trim().length > 4;

  function handleContinue() {
    completeOnboarding({
      name,
      username,
      password,
      location,
      interests,
      skills,
      goals,
    });
  }

  return (
    <ScreenContainer scroll>
      <View style={styles.hero}>
        <View style={styles.logoBox}>
          <Ionicons name="sparkles" size={36} color={colors.primary} />
        </View>
        <Text style={styles.title}>AI Life Advisor</Text>
        <Text style={styles.subtitle}>Create your profile to begin with your own data.</Text>
      </View>

      <Card>
        <InputField
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <InputField
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="Choose a username"
          keyboardType="default"
        />
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          keyboardType="default"
          secureTextEntry
        />
        <InputField
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="City, Country"
        />
        <InputField
          label="Interests"
          value={interests}
          onChangeText={setInterests}
          placeholder="technology, design, finance"
          multiline
        />
        <InputField
          label="Skills"
          value={skills}
          onChangeText={setSkills}
          placeholder="communication, coding, teamwork"
          multiline
        />
        <InputField
          label="Goals"
          value={goals}
          onChangeText={setGoals}
          placeholder="save money, learn a skill, choose a career"
          multiline
        />
        <PrimaryButton
          title="Start My Advisor"
          icon="arrow-forward-circle-outline"
          onPress={handleContinue}
          disabled={!canContinue}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.switchAction}>
          <Text style={styles.switchText}>Already have an account? Log in</Text>
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
});
