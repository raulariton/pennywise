'use client';

import BudgetVsSpentChart from '@/components/atoms/BudgetSpentChart';
import CategoryPieChart from '@/components/atoms/CategoryPieChart';
import IncomeVsExpensesChart from '@/components/atoms/IncomeExpenseChart2';
import PageTemplate from '@/components/templates/PageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Statistics = () => {
  return (
    <PageTemplate title="Statistics" subtitle="General statistics about your finances">
      <div className="space-y-8">
        {/* Row 1: Income vs Expenses */}
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeVsExpensesChart />
          </CardContent>
        </Card>

        {/* Row 2: Category Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryPieChart />
            </CardContent>
          </Card>

          {/* Row 2: Budgets vs Spent */}
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Budgets vs Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetVsSpentChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Statistics;
