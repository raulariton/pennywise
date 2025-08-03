'use client';

import BudgetVsSpentChart from '@/components/atoms/BudgetSpentChart';
import CategoryPieChart from '@/components/atoms/CategoryPieChart';
import IncomeVsExpensesChart from '@/components/atoms/IncomeExpenseChart2';
import PageTemplate from '@/components/templates/PageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Statistics = () => {
  return (
    <PageTemplate title="Statistics">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Row 1: Income vs Expenses */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <IncomeVsExpensesChart />
            </CardContent>
          </Card>

          {/* Row 2: Category Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryPieChart />
              </CardContent>
            </Card>

            {/* Row 2: Budgets vs Spent */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Budgets vs Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <BudgetVsSpentChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Statistics;
