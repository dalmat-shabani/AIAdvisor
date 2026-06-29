import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import {
  AdviceCard,
  Card,
  ExpenseCategoryRow,
  InputField,
  PrimaryButton,
  ScreenContainer,
  SectionHeader,
  StatCard,
} from '../components';
import colors from '../constants/colors';
import theme from '../constants/theme';
import { useUser } from '../context/UserContext';
import { formatCurrency, getFinanceSummary, getSpendingAdvice } from '../utils/financeUtils';

export default function FinanceScreen() {
  const { finance, updateFinance, addExpenseCategory, removeExpenseCategory } = useUser();
  const [incomeInput, setIncomeInput] = useState(finance.income ? String(finance.income) : '');
  const [savingsInput, setSavingsInput] = useState(finance.savings ? String(finance.savings) : '');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const summary = getFinanceSummary(finance);
  const spendingAdvice = getSpendingAdvice(finance);

  function handleSaveFinance() {
    updateFinance({
      income: Number(incomeInput),
      savings: Number(savingsInput),
    });
  }

  function handleAddExpense() {
    const added = addExpenseCategory({
      name: expenseName,
      amount: expenseAmount,
    });

    if (added) {
      setExpenseName('');
      setExpenseAmount('');
    }
  }

  return (
    <ScreenContainer scroll>
      <SectionHeader
        title="Financial Overview"
        subtitle="Track income, expenses, and savings"
        icon="wallet-outline"
      />

      <View style={styles.statsRow}>
        <StatCard
          label="Income"
          value={formatCurrency(summary.income)}
          icon="arrow-down-circle-outline"
          color={colors.success}
        />
        <StatCard
          label="Expenses"
          value={formatCurrency(summary.expenses)}
          icon="arrow-up-circle-outline"
          color={colors.danger}
        />
        <StatCard
          label="Savings"
          value={formatCurrency(summary.savings)}
          icon="save-outline"
          color={colors.primary}
        />
      </View>

      <Card style={styles.overviewCard}>
        <View style={styles.overviewRow}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Savings Rate</Text>
            <Text style={[styles.overviewValue, { color: colors.success }]}>
              {summary.savingsRate}%
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Net Cash Flow</Text>
            <Text style={[styles.overviewValue, { color: colors.primary }]}>
              {formatCurrency(summary.netCashFlow)}
            </Text>
          </View>
        </View>
      </Card>

      <SectionHeader title="Edit Your Numbers" subtitle="Use your own monthly data" />
      <Card>
        <InputField
          label="Monthly Income"
          value={incomeInput}
          onChangeText={setIncomeInput}
          placeholder="Enter your monthly income"
          keyboardType="numeric"
        />
        <InputField
          label="Monthly Savings"
          value={savingsInput}
          onChangeText={setSavingsInput}
          placeholder="Enter your monthly savings"
          keyboardType="numeric"
        />
        <PrimaryButton
          title="Save Finance Numbers"
          icon="save-outline"
          onPress={handleSaveFinance}
        />
      </Card>

      <SectionHeader title="Add Expense" subtitle="Create your own categories" />
      <Card>
        <InputField
          label="Expense Name"
          value={expenseName}
          onChangeText={setExpenseName}
          placeholder="e.g. Gym, Books, Phone"
        />
        <InputField
          label="Monthly Amount"
          value={expenseAmount}
          onChangeText={setExpenseAmount}
          placeholder="80"
          keyboardType="numeric"
        />
        <PrimaryButton
          title="Add Expense"
          icon="add-circle-outline"
          onPress={handleAddExpense}
        />
      </Card>

      <SectionHeader title="Expense Breakdown" subtitle="By category this month" />
      <Card>
        <FlatList
          data={summary.categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseCategoryRow category={item} onDelete={removeExpenseCategory} />
          )}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No expenses yet. Add your first category above.</Text>
          }
        />
      </Card>

      <SectionHeader
        title="AI Spending Advice"
        subtitle="Personalized tips based on your data"
        icon="bulb-outline"
      />
      {spendingAdvice.map((advice) => (
        <AdviceCard
          key={advice.id}
          title={advice.title}
          message={advice.message}
          icon={advice.icon}
          color={advice.color}
          type={advice.type}
        />
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    marginHorizontal: -4,
  },
  overviewCard: {
    marginBottom: theme.spacing.lg,
  },
  overviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: theme.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  emptyText: {
    fontSize: theme.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: theme.spacing.lg,
  },
});
