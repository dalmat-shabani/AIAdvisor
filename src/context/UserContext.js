import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const UserContext = createContext(null);

const STORAGE_KEYS = {
  profile: 'userProfile',
  credentials: 'registeredCredentials',
  hasCompletedOnboarding: 'hasCompletedOnboarding',
  interests: 'userInterests',
  skills: 'userSkills',
  goals: 'userGoals',
};

const EXPENSE_COLORS = ['#2563EB', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444', '#06B6D4'];
const EMPTY_PROFILE = {
  name: '',
  username: '',
  location: '',
  memberSince: '',
  summary: {
    financialHealth: 'Not started',
    savingsRate: 0,
    topGoal: 'Set your goals',
    riskLevel: 'Unknown',
  },
  stats: [],
};

const EMPTY_FINANCE = {
  income: 0,
  expenses: 0,
  savings: 0,
  currency: 'USD',
  categories: [],
};

function addCategoryPercents(categories) {
  const total = categories.reduce((sum, category) => sum + Number(category.amount || 0), 0);

  return categories.map((category) => ({
    ...category,
    amount: Number(category.amount || 0),
    percent: total > 0 ? Math.round((Number(category.amount || 0) / total) * 100) : 0,
  }));
}

function normalizeFinance(finance) {
  const categories = addCategoryPercents(finance.categories || []);
  const expenses = categories.reduce((sum, category) => sum + category.amount, 0);

  return {
    ...finance,
    income: Number(finance.income || 0),
    savings: Number(finance.savings || 0),
    expenses,
    categories,
  };
}

export function UserProvider({ children }) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [finance, setFinance] = useState(normalizeFinance(EMPTY_FINANCE));
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [goals, setGoals] = useState('');
  const [advisorResults, setAdvisorResults] = useState(null);
  const [registeredCredentials, setRegisteredCredentials] = useState(null);

  useEffect(() => {
    async function loadStoredData() {
      try {
        const [storedProfile, storedCredentials, storedInterests, storedSkills, storedGoals] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.profile),
          AsyncStorage.getItem(STORAGE_KEYS.credentials),
          AsyncStorage.getItem(STORAGE_KEYS.interests),
          AsyncStorage.getItem(STORAGE_KEYS.skills),
          AsyncStorage.getItem(STORAGE_KEYS.goals),
        ]);

        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }

        if (storedCredentials) {
          setRegisteredCredentials(JSON.parse(storedCredentials));
        }

        if (storedInterests) {
          setInterests(storedInterests);
        }

        if (storedSkills) {
          setSkills(storedSkills);
        }

        if (storedGoals) {
          setGoals(storedGoals);
        }
      } catch (error) {
        console.warn('Failed to load stored user data', error);
      }
    }

    loadStoredData();
  }, []);

  function normalizeUsername(value) {
    return value.trim().replace(/^@/, '').toLowerCase();
  }

  function completeOnboarding({ name, username, password, location, interests: nextInterests, skills: nextSkills, goals: nextGoals }) {
    const normalizedUsername = normalizeUsername(username);
    const normalizedPassword = password.trim();

    const newProfile = {
      ...EMPTY_PROFILE,
      name: name.trim(),
      username: normalizedUsername,
      location: location.trim(),
      memberSince: new Date().getFullYear().toString(),
      summary: {
        ...EMPTY_PROFILE.summary,
        topGoal: nextGoals.trim() || EMPTY_PROFILE.summary.topGoal,
      },
    };

    const credentials = { username: normalizedUsername, password: normalizedPassword };

    setProfile(newProfile);
    setRegisteredCredentials(credentials);
    setInterests(nextInterests.trim());
    setSkills(nextSkills.trim());
    setGoals(nextGoals.trim());
    setHasCompletedOnboarding(true);

    AsyncStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(newProfile));
    AsyncStorage.setItem(STORAGE_KEYS.credentials, JSON.stringify(credentials));
    AsyncStorage.setItem(STORAGE_KEYS.interests, nextInterests.trim());
    AsyncStorage.setItem(STORAGE_KEYS.skills, nextSkills.trim());
    AsyncStorage.setItem(STORAGE_KEYS.goals, nextGoals.trim());
  }

  async function login({ username, password }) {
    const normalizedUsername = normalizeUsername(username);
    const normalizedPassword = password.trim();

    let credentials = registeredCredentials;
    if (!credentials) {
      const storedCredentials = await AsyncStorage.getItem(STORAGE_KEYS.credentials);
      credentials = storedCredentials ? JSON.parse(storedCredentials) : null;
      if (credentials) {
        setRegisteredCredentials(credentials);
      }
    }

    if (
      !credentials ||
      credentials.username !== normalizedUsername ||
      credentials.password !== normalizedPassword
    ) {
      return false;
    }

    setHasCompletedOnboarding(true);
    return true;
  }

  function updateProfile(updates) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      ...updates,
    }));
  }

  function updateFinance(updates) {
    setFinance((currentFinance) => normalizeFinance({
      ...currentFinance,
      ...updates,
    }));
  }

  function addExpenseCategory({ name, amount }) {
    const parsedAmount = Number(amount);
    if (!name.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return false;
    }

    setFinance((currentFinance) => {
      const nextIndex = currentFinance.categories.length;
      return normalizeFinance({
        ...currentFinance,
        categories: [
          ...currentFinance.categories,
          {
            id: Date.now().toString(),
            name: name.trim(),
            amount: parsedAmount,
            percent: 0,
            icon: 'cash-outline',
            color: EXPENSE_COLORS[nextIndex % EXPENSE_COLORS.length],
          },
        ],
      });
    });

    return true;
  }

  function removeExpenseCategory(categoryId) {
    setFinance((currentFinance) => normalizeFinance({
      ...currentFinance,
      categories: currentFinance.categories.filter((category) => category.id !== categoryId),
    }));
  }

  const value = useMemo(
    () => ({
      hasCompletedOnboarding,
      completeOnboarding,
      login,
      profile,
      updateProfile,
      finance,
      updateFinance,
      addExpenseCategory,
      removeExpenseCategory,
      interests,
      skills,
      goals,
      setInterests,
      setSkills,
      setGoals,
      advisorResults,
      setAdvisorResults,
      registeredCredentials,
    }),
    [hasCompletedOnboarding, profile, finance, interests, skills, goals, advisorResults, registeredCredentials],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
