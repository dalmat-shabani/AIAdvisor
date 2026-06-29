import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  AdviceCard,
  Card,
  InputField,
  PrimaryButton,
  ScreenContainer,
  SectionHeader,
} from '../components';
import colors from '../constants/colors';
import theme from '../constants/theme';
import { useUser } from '../context/UserContext';
import { generateAdvisorRecommendations } from '../utils/aiAdvisor';

export default function AIAdvisorScreen() {
  const {
    interests,
    skills,
    goals,
    finance,
    setInterests,
    setSkills,
    setGoals,
    advisorResults,
    setAdvisorResults,
  } = useUser();

  function handleAnalyze() {
    const results = generateAdvisorRecommendations({ interests, skills, goals, finance });
    setAdvisorResults(results);
  }

  function handleClear() {
    setInterests('');
    setSkills('');
    setGoals('');
    setAdvisorResults(null);
  }

  return (
    <ScreenContainer scroll>
      <SectionHeader
        title="Tell Us About You"
        subtitle="Our AI analyzes your profile to give personalized advice"
        icon="person-outline"
      />

      <Card>
        <InputField
          label="Interests"
          value={interests}
          onChangeText={setInterests}
          placeholder="e.g. technology, design, finance"
          multiline
        />
        <InputField
          label="Skills"
          value={skills}
          onChangeText={setSkills}
          placeholder="e.g. JavaScript, communication, Excel"
          multiline
        />
        <InputField
          label="Goals"
          value={goals}
          onChangeText={setGoals}
          placeholder="e.g. career change, save more, learn coding"
          multiline
        />

        <PrimaryButton
          title="Get AI Recommendations"
          icon="sparkles"
          onPress={handleAnalyze}
        />

        <Button title="Clear Form" onPress={handleClear} color={colors.textSecondary} />
      </Card>

      {advisorResults ? (
        <View style={styles.results}>
          <SectionHeader title="AI Analysis" icon="analytics-outline" />

          <Card style={styles.summaryCard}>
            <Text style={styles.summaryText}>{advisorResults.summary}</Text>
          </Card>

          <SectionHeader title="Recommendations" subtitle="Based on your profile" />
          {advisorResults.recommendations.map((rec) => (
            <AdviceCard
              key={rec.id}
              title={rec.title}
              message={rec.message}
              icon={rec.icon}
              color={rec.color}
              type={rec.type}
            />
          ))}

          <SectionHeader title="Top Career Matches" subtitle="See Career tab for full list" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {advisorResults.matchedCareers.map((career) => (
              <Card key={career.id} style={styles.matchCard}>
                <Text style={styles.matchTitle}>{career.title}</Text>
                <Text style={styles.matchScore}>{career.matchScore}% match</Text>
                <Text style={styles.matchSalary}>{career.salaryRange}</Text>
              </Card>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  results: {
    marginTop: theme.spacing.sm,
  },
  summaryCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary + '30',
  },
  summaryText: {
    fontSize: theme.fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  matchCard: {
    width: 160,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  matchTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  matchScore: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  matchSalary: {
    fontSize: theme.fontSize.xs,
    color: colors.success,
  },
});
