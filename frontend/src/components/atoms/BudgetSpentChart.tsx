'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useFetchAllBudgets } from '@/hooks/crud/useBudget';
import { BarChart3, Filter } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Mock hook for demonstration - replace with your actual hook

export default function BudgetVsSpentChart() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedRange, setSelectedRange] = useState<string>('6m');
  const [chartType, setChartType] = useState<'composed' | 'area'>('composed');

  // Fetch all budgets from API
  const { budgets, isLoading } = useFetchAllBudgets();

  const categories = useMemo(() => {
    return budgets ? [...new Set(budgets.map((b: any) => b.category))] : [];
  }, [budgets]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const data = useMemo(() => {
    if (!budgets || !selectedCategory) return [];

    // Filter data for the selected category
    const filteredCategoryData = budgets.filter((b: any) => b.category === selectedCategory);
    if (filteredCategoryData.length === 0) return [];

    // Sort all category data by date
    const sortedByDate = [...filteredCategoryData].sort(
      (a: any, b: any) => new Date(a.month).getTime() - new Date(b.month).getTime(),
    );

    // Determine the latest available month in the dataset
    const latestDate = new Date(sortedByDate[sortedByDate.length - 1].month);

    // Compute cutoff date relative to the latest date in dataset
    let cutoffDate = new Date(latestDate);
    if (selectedRange === '6m') {
      cutoffDate.setMonth(latestDate.getMonth() - 5); // last 6 months (including current)
    } else if (selectedRange === '1y') {
      cutoffDate.setFullYear(latestDate.getFullYear() - 1);
    } else if (selectedRange === '5y') {
      cutoffDate.setFullYear(latestDate.getFullYear() - 5);
    }

    return sortedByDate
      .filter((b: any) => new Date(b.month) >= cutoffDate)
      .map((b: any) => {
        const dateObj = new Date(b.month);
        return {
          date: dateObj,
          label: dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          budget: b.budget,
          spent: b.spent,
          difference: b.budget - b.spent,
          percentage: Math.round((b.spent / b.budget) * 100),
        };
      });
  }, [budgets, selectedCategory, selectedRange]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    if (!data.length) return null;

    const totalBudget = data.reduce((sum, item) => sum + item.budget, 0);
    const totalSpent = data.reduce((sum, item) => sum + item.spent, 0);
    const avgBudgetUtilization = Math.round((totalSpent / totalBudget) * 100);
    const monthsOverBudget = data.filter((item) => item.spent > item.budget).length;
    const totalSaved = totalBudget - totalSpent;

    return {
      totalBudget,
      totalSpent,
      totalSaved,
      avgBudgetUtilization,
      monthsOverBudget,
      trend: totalSaved > 0 ? 'positive' : 'negative',
    };
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-lg p-4 min-w-[200px]">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Budget:</span>
              <span className="font-medium text-blue-600">${data.budget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Spent:</span>
              <span className="font-medium text-red-600">${data.spent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Difference:</span>
              <span
                className={`font-medium ${data.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {data.difference >= 0 ? '+' : ''}${data.difference.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-gray-200">
              <span className="text-sm text-gray-600">Utilization:</span>
              <span className="font-medium text-gray-900">{data.percentage}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, subtitle, trend }: any) => (
    <div className="group bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div
          className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
            trend === 'positive'
              ? 'bg-green-50 group-hover:bg-green-100'
              : trend === 'negative'
                ? 'bg-red-50 group-hover:bg-red-100'
                : 'bg-blue-50 group-hover:bg-blue-100'
          }`}
        ></div>
      </div>
    </div>
  );

  const FilterButton = ({ active, onClick, children }: any) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        active
          ? 'bg-blue-500 text-white shadow-lg transform scale-105'
          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 shadow-sm hover:shadow-md'
      }`}
    >
      {children}
    </button>
  );

  if (isLoading) {
    return (
      <Card className="w-full max-w-6xl bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-gray-600 font-medium">Loading chart data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl space-y-6">
      {/* Controls and Chart */}
      <Card className="bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl border-0 shadow-xl">
        <CardContent className="p-6">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
            {/* Category Selection */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Category
              </label>
              <select
                className="bg-white/90 backdrop-blur border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 min-w-[200px]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={!categories.length}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Range Selection */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">Time Range</label>
              <div className="flex space-x-2">
                <FilterButton
                  active={selectedRange === '6m'}
                  onClick={() => setSelectedRange('6m')}
                >
                  6 Months
                </FilterButton>
                <FilterButton
                  active={selectedRange === '1y'}
                  onClick={() => setSelectedRange('1y')}
                >
                  1 Year
                </FilterButton>
              </div>
            </div>

            {/* Chart Type Selection */}
          </div>

          {/* Chart */}
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <BarChart3 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
              <p className="text-gray-600 max-w-md">
                No budget data found for the selected category and time range. Try selecting a
                different category or time period.
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50/50 to-white/50 rounded-xl p-6">
              <ResponsiveContainer width="100%" height={400}>
                {chartType === 'composed' ? (
                  <ComposedChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 10, bottom: 20 }} // add margins
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="label" stroke="#9CA3AF" fontSize={12} fontWeight={500} />
                    <YAxis stroke="#9CA3AF" fontSize={12} fontWeight={500} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="top"
                      height={40}
                      iconType="rect"
                      wrapperStyle={{ fontSize: '14px', fontWeight: '500' }}
                    />
                    <Bar
                      dataKey="budget"
                      fill="url(#budgetGradient)"
                      radius={[6, 6, 0, 0]}
                      name="Budget"
                    />
                    <Line
                      type="monotone"
                      dataKey="spent"
                      stroke="#EF4444"
                      strokeWidth={3}
                      dot={{ fill: '#EF4444', strokeWidth: 2, r: 5 }}
                      name="Spent"
                    />
                    <defs>
                      <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                  </ComposedChart>
                ) : (
                  <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="label" stroke="#9CA3AF" fontSize={12} fontWeight={500} />
                    <YAxis stroke="#9CA3AF" fontSize={12} fontWeight={500} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="top"
                      height={40}
                      iconType="rect"
                      wrapperStyle={{ fontSize: '14px', fontWeight: '500' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="budget"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="url(#budgetAreaGradient)"
                      name="Budget"
                    />
                    <Area
                      type="monotone"
                      dataKey="spent"
                      stackId="2"
                      stroke="#EF4444"
                      fill="url(#spentAreaGradient)"
                      name="Spent"
                    />
                    <defs>
                      <linearGradient id="budgetAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="spentAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
