import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet } from 'react-native';

import { CareerListItem, EmptyState, ScreenContainer, SectionHeader } from '../components';
import theme from '../constants/theme';
import { useUser } from '../context/UserContext';
import { matchCareers } from '../utils/aiAdvisor';

export default function CareerScreen() {
  const navigation = useNavigation();
  const { interests, skills, goals } = useUser();

  const careers = matchCareers(interests, skills, goals)
    .filter((career) => career.matchScore >= 30)
    .slice(0, 4);

  function handleCareerPress(career) {
    navigation.navigate('CareerDetails', { career });
  }

  return (
    <ScreenContainer>
      <SectionHeader
        title="Career Options"
        subtitle="Tap a career to view full details"
        icon="briefcase-outline"
      />

      <FlatList
        data={careers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CareerListItem
            item={item}
            matchScore={item.matchScore > 0 ? item.matchScore : null}
            onPress={() => handleCareerPress(item)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title="No careers found"
            message="Visit the AI Advisor tab to get personalized matches."
          />
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: theme.spacing.lg,
    flexGrow: 1,
  },
});
