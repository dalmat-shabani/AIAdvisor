import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card, InputField, PrimaryButton, ScreenContainer, SectionHeader, StatCard } from '../components';
import colors from '../constants/colors';
import theme from '../constants/theme';
import { useUser } from '../context/UserContext';
import { getFinanceSummary, getFinancialHealth, getRiskLevel } from '../utils/financeUtils';

export default function ProfileScreen() {
  const {
    profile,
    updateProfile,
    finance,
    interests,
    skills,
    goals,
    setInterests,
    setSkills,
    setGoals,
  } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [draftProfile, setDraftProfile] = useState(profile);
  const [draftInterests, setDraftInterests] = useState(interests);
  const [draftSkills, setDraftSkills] = useState(skills);
  const [draftGoals, setDraftGoals] = useState(goals);
  const financeSummary = getFinanceSummary(finance);
  const financialHealth = getFinancialHealth(finance);
  const riskLevel = getRiskLevel(finance);

  function handleStartEditing() {
    setDraftProfile(profile);
    setDraftInterests(interests);
    setDraftSkills(skills);
    setDraftGoals(goals);
    setIsEditing(true);
  }

  function handleSaveProfile() {
    updateProfile(draftProfile);
    setInterests(draftInterests);
    setSkills(draftSkills);
    setGoals(draftGoals);
    setIsEditing(false);
  }

  function updateDraftProfile(field, value) {
    setDraftProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
  }

  return (
    <ScreenContainer scroll>
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={colors.primary} />
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>@{profile.username}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.location}>{profile.location}</Text>
        </View>
        <Text style={styles.memberSince}>Member since {profile.memberSince}</Text>
      </View>

      <View style={styles.statsRow}>
        {profile.stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </View>

      <SectionHeader title="Your Profile" subtitle="Information used by the AI Advisor" />
      <Card>
        {isEditing ? (
          <>
            <InputField
              label="Name"
              value={draftProfile.name}
              onChangeText={(value) => updateDraftProfile('name', value)}
              placeholder="Your name"
            />
            <InputField
              label="Username"
              value={draftProfile.username}
              onChangeText={(value) => updateDraftProfile('username', value)}
              placeholder="your username"
              keyboardType="default"
            />
            <InputField
              label="Location"
              value={draftProfile.location}
              onChangeText={(value) => updateDraftProfile('location', value)}
              placeholder="Your city"
            />
            <InputField
              label="Interests"
              value={draftInterests}
              onChangeText={setDraftInterests}
              placeholder="technology, design, sports"
              multiline
            />
            <InputField
              label="Skills"
              value={draftSkills}
              onChangeText={setDraftSkills}
              placeholder="communication, coding, teamwork"
              multiline
            />
            <InputField
              label="Goals"
              value={draftGoals}
              onChangeText={setDraftGoals}
              placeholder="save money, learn coding, work remotely"
              multiline
            />
            <PrimaryButton title="Save Profile" icon="save-outline" onPress={handleSaveProfile} />
            <PrimaryButton
              title="Cancel"
              icon="close-outline"
              variant="outline"
              onPress={() => setIsEditing(false)}
            />
          </>
        ) : (
          <>
            <ProfileField label="Interests" value={interests} icon="heart-outline" />
            <ProfileField label="Skills" value={skills} icon="construct-outline" />
            <ProfileField label="Goals" value={goals} icon="flag-outline" />
            <PrimaryButton
              title="Edit Profile"
              icon="create-outline"
              onPress={handleStartEditing}
            />
          </>
        )}
      </Card>

      <SectionHeader title="Financial Snapshot" />
      <Card>
        <View style={styles.snapshotRow}>
          <SnapshotItem label="Health" value={financialHealth} />
          <SnapshotItem label="Savings Rate" value={`${financeSummary.savingsRate}%`} />
          <SnapshotItem label="Risk Level" value={riskLevel} />
        </View>
      </Card>
    </ScreenContainer>
  );
}

function ProfileField({ label, value, icon }) {
  return (
    <View style={styles.field}>
      <View style={styles.fieldHeader}>
        <Ionicons name={icon} size={18} color={colors.primary} />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <Text style={styles.fieldValue}>{value || 'Not set'}</Text>
    </View>
  );
}

function SnapshotItem({ label, value }) {
  return (
    <View style={styles.snapshotItem}>
      <Text style={styles.snapshotLabel}>{label}</Text>
      <Text style={styles.snapshotValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 3,
    borderColor: colors.primary + '30',
  },
  name: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: theme.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: theme.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  memberSince: {
    fontSize: theme.fontSize.xs,
    color: colors.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    marginHorizontal: -4,
  },
  field: {
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    marginLeft: theme.spacing.sm,
  },
  fieldValue: {
    fontSize: theme.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    paddingLeft: 26,
  },
  snapshotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snapshotItem: {
    flex: 1,
    alignItems: 'center',
  },
  snapshotLabel: {
    fontSize: theme.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  snapshotValue: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: colors.text,
  },
});
