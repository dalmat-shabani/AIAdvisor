import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { fetchInspirationalQuotes } from '../api/quotesApi';
import {
  Card,
  Carousel,
  EmptyState,
  LoadingView,
  RecommendationSlide,
  ScreenContainer,
  SectionHeader,
  StatCard,
} from '../components';
import colors from '../constants/colors';
import theme from '../constants/theme';
import { useUser } from '../context/UserContext';
import { formatCurrency, getFinanceSummary } from '../utils/financeUtils';

const recommendationsData = require('../data/recommendations.json');

export default function HomeScreen() {
  const { profile, finance } = useUser();
  const [quotes, setQuotes] = useState([]);
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [quoteError, setQuoteError] = useState(null);
  const financeSummary = getFinanceSummary(finance);
  const stats = [
    {
      label: 'Monthly Savings',
      value: formatCurrency(financeSummary.savings),
      icon: 'wallet-outline',
      color: colors.success,
    },
    { label: 'Goals Active', value: '3', icon: 'flag-outline', color: colors.primary },
    { label: 'Skills Tracked', value: '8', icon: 'construct-outline', color: colors.purple },
  ];

  useEffect(() => {
    loadQuotes();
  }, []);

  async function loadQuotes() {
    try {
      setLoadingQuotes(true);
      setQuoteError(null);
      const data = await fetchInspirationalQuotes(6);
      setQuotes(data);
    } catch (error) {
      setQuoteError(error.message);
    } finally {
      setLoadingQuotes(false);
    }
  }

  function renderQuoteItem({ item }) {
    return (
      <Card style={styles.quoteCard}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.primary} />
        <Text style={styles.quoteText}>{`"${item.text}"`}</Text>
        <Text style={styles.quoteAuthor}>— {item.author}</Text>
      </Card>
    );
  }

  return (
    <ScreenContainer scroll>
      <SectionHeader
        title={`Hello, ${profile.name?.trim() ? profile.name.split(' ')[0] : 'there'}!`}
        subtitle="Here's your personalized AI overview"
        icon="sparkles"
      />

      <SectionHeader title="AI Recommendations" subtitle="Swipe to explore insights" />
      <Carousel
        data={recommendationsData.recommendations}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <RecommendationSlide item={item} />}
      />

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </View>

      <Card style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>User Summary</Text>
        <View style={styles.summaryGrid}>
          <SummaryItem label="Financial Health" value={profile.summary.financialHealth} />
          <SummaryItem label="Savings Rate" value={`${financeSummary.savingsRate}%`} />
          <SummaryItem label="Top Goal" value={profile.summary.topGoal} />
          <SummaryItem label="Risk Level" value={profile.summary.riskLevel} />
        </View>
      </Card>

      <SectionHeader
        title="Daily Inspiration"
        subtitle="Fetched from Quotable API"
        icon="cloud-download-outline"
      />

      {loadingQuotes ? (
        <LoadingView message="Loading quotes..." />
      ) : quoteError ? (
        <EmptyState
          icon="cloud-offline-outline"
          title="Could not load quotes"
          message={quoteError}
        />
      ) : (
        <FlatList
          data={quotes}
          keyExtractor={(item) => item.id}
          renderItem={renderQuoteItem}
          scrollEnabled={false}
          ListEmptyComponent={
            <EmptyState title="No quotes" message="Try again later." />
          }
        />
      )}

      <TouchableOpacity style={styles.refreshButton} onPress={loadQuotes} activeOpacity={0.7}>
        <Ionicons name="refresh-outline" size={18} color={colors.primary} />
        <Text style={styles.refreshText}>Refresh Quotes</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

function SummaryItem({ label, value }) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    marginHorizontal: -4,
  },
  summaryCard: {
    marginBottom: theme.spacing.lg,
  },
  summaryTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: theme.spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  summaryItem: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: theme.spacing.md,
  },
  summaryLabel: {
    fontSize: theme.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: colors.text,
  },
  quoteCard: {
    marginBottom: theme.spacing.sm,
  },
  quoteText: {
    fontSize: theme.fontSize.sm,
    color: colors.text,
    fontStyle: 'italic',
    lineHeight: 20,
    marginVertical: theme.spacing.sm,
  },
  quoteAuthor: {
    fontSize: theme.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  refreshText: {
    fontSize: theme.fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 6,
  },
});
