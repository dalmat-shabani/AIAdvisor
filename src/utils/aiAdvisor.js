import { getFinanceSummary, getSpendingAdvice } from './financeUtils';

const careersData = require('../data/careers.json');

const STOP_WORDS = new Set(['and', 'or', 'the', 'a', 'an', 'to', 'for', 'with', 'in', 'on', 'of', 'my', 'as', 'by', 'at', 'from']);

function normalizeText(text) {
  return text.toLowerCase().trim();
}

function extractKeywords(text) {
  return Array.from(
    new Set(
      normalizeText(text)
        .split(/[^a-z0-9]+/)
        .map((s) => s.trim())
        .filter((keyword) => keyword && !STOP_WORDS.has(keyword))
    )
  );
}

function calculateCareerMatch(career, interests, skills, goals) {
  const userKeywords = [
    ...extractKeywords(interests),
    ...extractKeywords(skills),
    ...extractKeywords(goals),
  ];

  if (userKeywords.length === 0) return 0;

  const careerKeywords = [
    ...career.matchTags.map(normalizeText),
    ...career.skills.map(normalizeText),
    normalizeText(career.title),
    normalizeText(career.category),
  ];

  let score = 0;
  careerKeywords.forEach((careerKeyword) => {
    userKeywords.forEach((keyword) => {
      if (keyword === careerKeyword) {
        score += 3;
      } else if (careerKeyword.includes(keyword) || keyword.includes(careerKeyword)) {
        score += 2;
      }
    });
  });

  const maxPossible = careerKeywords.length * 3;
  return Math.min(100, Math.round((score / Math.max(maxPossible, 1)) * 100));
}

export function matchCareers(interests, skills, goals) {
  return careersData.careers
    .map((career) => ({
      ...career,
      matchScore: calculateCareerMatch(career, interests, skills, goals),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function generateAdvisorRecommendations({ interests, skills, goals, finance: financeData }) {
  const finance = getFinanceSummary(financeData);
  const spendingAdvice = getSpendingAdvice(financeData);
  const matchedCareers = matchCareers(interests, skills, goals);
  const topCareer = matchedCareers[0];

  const recommendations = [];

  if (topCareer && topCareer.matchScore > 0) {
    recommendations.push({
      id: 'career-match',
      type: 'career',
      title: `Top Match: ${topCareer.title}`,
      message: `${topCareer.title} is a ${topCareer.matchScore}% match based on your interests, skills, and goals. Expected salary: ${topCareer.salaryRange}.`,
      icon: topCareer.icon,
      color: '#2563EB',
    });
  } else {
    recommendations.push({
      id: 'career-explore',
      type: 'career',
      title: 'Explore Career Options',
      message: 'Add more details about your interests and skills to get personalized career matches.',
      icon: 'search-outline',
      color: '#2563EB',
    });
  }

  if (finance.savingsRate >= 20) {
    recommendations.push({
      id: 'finance-invest',
      type: 'finance',
      title: 'Allocate Savings Wisely',
      message: `With a ${finance.savingsRate}% savings rate, consider dedicating $200-400/month to courses or certifications aligned with your goals.`,
      icon: 'trending-up-outline',
      color: '#10B981',
    });
  } else {
    recommendations.push({
      id: 'finance-save',
      type: 'finance',
      title: 'Build Your Safety Net First',
      message: 'Before a major career change, aim for 3-6 months of expenses in savings. Focus on reducing non-essential spending.',
      icon: 'shield-checkmark-outline',
      color: '#F59E0B',
    });
  }

  const goalKeywords = extractKeywords(goals);
  if (goalKeywords.some((g) => g.includes('tech') || g.includes('developer') || g.includes('coding'))) {
    recommendations.push({
      id: 'goal-tech',
      type: 'goal',
      title: 'Tech Transition Plan',
      message: 'Start with free coding resources, build 2-3 portfolio projects, and network on LinkedIn. Timeline: 6-12 months for entry-level roles.',
      icon: 'rocket-outline',
      color: '#8B5CF6',
    });
  }

  if (goalKeywords.some((g) => g.includes('remote') || g.includes('freelance'))) {
    recommendations.push({
      id: 'goal-remote',
      type: 'goal',
      title: 'Remote Work Readiness',
      message: 'Digital Marketing and Software Development offer strong remote opportunities. Build an online portfolio to attract clients or employers.',
      icon: 'laptop-outline',
      color: '#06B6D4',
    });
  }

  const summary = topCareer && topCareer.matchScore > 30
    ? `Based on your profile, ${topCareer.title} aligns best with your goals. Your finances ${finance.savingsRate >= 20 ? 'support' : 'may need adjustment before'} a career transition.`
    : 'Complete your profile with specific interests and skills for better recommendations. Your current finances show room for optimization.';

  const uniqueRecommendations = [];
  const addedTypes = new Set();

  recommendations.forEach((recommendation) => {
    if (!addedTypes.has(recommendation.type)) {
      uniqueRecommendations.push(recommendation);
      addedTypes.add(recommendation.type);
    }
  });

  if (!addedTypes.has('goal') && goalKeywords.length > 0) {
    uniqueRecommendations.push({
      id: 'goal-review',
      type: 'goal',
      title: 'Refine Your Goals',
      message: 'Your goals are key to personalized advice. Try making them more specific so the AI can tailor suggestions better.',
      icon: 'flag-outline',
      color: '#8B5CF6',
    });
  }

  return {
    summary,
    recommendations: uniqueRecommendations,
    spendingAdvice: spendingAdvice.slice(0, 3),
    matchedCareers: matchedCareers.slice(0, 4),
    generatedAt: new Date().toISOString(),
  };
}

export function getCareerById(careerId) {
  return careersData.careers.find((c) => c.id === careerId) || null;
}
