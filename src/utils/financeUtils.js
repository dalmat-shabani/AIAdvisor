const financeData = require('../data/finance.json');

export function getFinanceSummary(finance = financeData) {
  const netCashFlow = finance.income - finance.expenses;
  const savingsRate = finance.income > 0 ? Math.round((finance.savings / finance.income) * 100) : 0;
  const expenseRatio = finance.income > 0 ? Math.round((finance.expenses / finance.income) * 100) : 0;

  return {
    income: finance.income,
    expenses: finance.expenses,
    savings: finance.savings,
    netCashFlow,
    savingsRate,
    expenseRatio,
    currency: finance.currency,
    categories: finance.categories,
  };
}

export function getSpendingAdvice(finance = financeData) {
  const advice = [];
  const summary = getFinanceSummary(finance);

  if (summary.savingsRate >= 20) {
    advice.push({
      id: 'save-good',
      type: 'savings',
      title: 'Healthy Savings Rate',
      message: `You're saving ${summary.savingsRate}% of your income. The recommended minimum is 20%. Consider investing extra in career growth.`,
      icon: 'checkmark-circle-outline',
      color: '#10B981',
    });
  } else {
    advice.push({
      id: 'save-low',
      type: 'savings',
      title: 'Increase Your Savings',
      message: `Your savings rate is ${summary.savingsRate}%. Try to reach at least 20% by cutting discretionary spending.`,
      icon: 'alert-circle-outline',
      color: '#F59E0B',
    });
  }

  finance.categories.forEach((category) => {
    if (category.percent >= 15 && category.name !== 'Housing') {
      advice.push({
        id: `cat-${category.id}`,
        type: 'spending',
        title: `Review ${category.name} Spending`,
        message: `${category.name} accounts for ${category.percent}% ($${category.amount}/mo). Consider reducing this category to free up budget.`,
        icon: category.icon,
        color: category.color,
      });
    }
  });

  const learning = finance.categories.find((c) => c.name === 'Learning');
  if (learning && learning.percent < 8) {
    advice.push({
      id: 'learning-invest',
      type: 'learning',
      title: 'Invest More in Learning',
      message: `You spend ${learning.percent}% on learning. Increasing to 8% could accelerate career growth and future earnings.`,
      icon: 'school-outline',
      color: '#06B6D4',
    });
  }

  if (summary.expenseRatio > 75) {
    advice.push({
      id: 'expense-high',
      type: 'warning',
      title: 'High Expense Ratio',
      message: `Expenses consume ${summary.expenseRatio}% of income. Look for subscriptions or entertainment costs to trim.`,
      icon: 'warning-outline',
      color: '#EF4444',
    });
  }

  return advice;
}

export function getFinancialHealth(finance = financeData) {
  const summary = getFinanceSummary(finance);

  if (summary.income <= 0) {
    return 'Not started';
  }

  if (summary.savingsRate >= 20 && summary.expenseRatio <= 50) {
    return 'Healthy';
  }

  if (summary.savingsRate >= 10) {
    return 'Improving';
  }

  return 'Needs improvement';
}

export function getRiskLevel(finance = financeData) {
  const summary = getFinanceSummary(finance);

  if (summary.income <= 0) {
    return 'Unknown';
  }

  if (summary.savingsRate >= 20 && summary.expenseRatio <= 50) {
    return 'Low';
  }

  if (summary.savingsRate >= 10) {
    return 'Medium';
  }

  return 'High';
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
