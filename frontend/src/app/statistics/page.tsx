'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Car,
  CreditCard,
  DollarSign,
  Eye,
  Gamepad2,
  Heart,
  Home,
  PiggyBank,
  ShoppingCart,
  Target,
  TrendingDown,
  TrendingUp,
  Utensils,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const FinanceStatistics = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Comprehensive sample data
  const monthlyData = [
    {
      month: 'Jan',
      income: 4500,
      expenses: 3200,
      savings: 1300,
      investments: 800,
      bills: 1200,
      food: 450,
      transport: 350,
    },
    {
      month: 'Feb',
      income: 4800,
      expenses: 3500,
      savings: 1300,
      investments: 900,
      bills: 1250,
      food: 480,
      transport: 380,
    },
    {
      month: 'Mar',
      income: 4600,
      expenses: 3100,
      savings: 1500,
      investments: 750,
      bills: 1180,
      food: 420,
      transport: 340,
    },
    {
      month: 'Apr',
      income: 5200,
      expenses: 3800,
      savings: 1400,
      investments: 1100,
      bills: 1300,
      food: 520,
      transport: 420,
    },
    {
      month: 'May',
      income: 4900,
      expenses: 3400,
      savings: 1500,
      investments: 950,
      bills: 1220,
      food: 460,
      transport: 380,
    },
    {
      month: 'Jun',
      income: 5100,
      expenses: 3600,
      savings: 1500,
      investments: 1000,
      bills: 1280,
      food: 490,
      transport: 400,
    },
  ];

  const weeklySpending = [
    { week: 'Week 1', amount: 680, target: 750 },
    { week: 'Week 2', amount: 720, target: 750 },
    { week: 'Week 3', amount: 850, target: 750 },
    { week: 'Week 4', amount: 620, target: 750 },
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 850, budget: 1000, color: '#FF6B6B', iconName: 'Utensils' },
    { name: 'Transportation', value: 420, budget: 500, color: '#4ECDC4', iconName: 'Car' },
    { name: 'Shopping', value: 680, budget: 800, color: '#45B7D1', iconName: 'ShoppingCart' },
    { name: 'Entertainment', value: 320, budget: 400, color: '#96CEB4', iconName: 'Gamepad2' },
    { name: 'Utilities', value: 240, budget: 300, color: '#FFEAA7', iconName: 'Zap' },
    { name: 'Healthcare', value: 180, budget: 250, color: '#DDA0DD', iconName: 'Heart' },
    { name: 'Housing', value: 1200, budget: 1200, color: '#FFB6C1', iconName: 'Home' },
    { name: 'Miscellaneous', value: 150, budget: 200, color: '#98D8C8', iconName: 'ArrowRight' },
  ];

  const investmentData = [
    { name: 'Stocks', value: 12500, percentage: 45, color: '#3B82F6' },
    { name: 'Bonds', value: 8200, percentage: 30, color: '#10B981' },
    { name: 'ETFs', value: 4800, percentage: 17, color: '#F59E0B' },
    { name: 'Crypto', value: 2200, percentage: 8, color: '#EF4444' },
  ];

  const goalProgress = [
    {
      goal: 'Emergency Fund',
      current: 8500,
      target: 15000,
      percentage: 57,
      monthlyContribution: 500,
      color: '#3B82F6',
    },
    {
      goal: 'Vacation Fund',
      current: 2800,
      target: 5000,
      percentage: 56,
      monthlyContribution: 300,
      color: '#10B981',
    },
    {
      goal: 'New Car',
      current: 12000,
      target: 25000,
      percentage: 48,
      monthlyContribution: 600,
      color: '#F59E0B',
    },
    {
      goal: 'Investment Portfolio',
      current: 27700,
      target: 50000,
      percentage: 55,
      monthlyContribution: 800,
      color: '#8B5CF6',
    },
    {
      goal: 'House Down Payment',
      current: 35000,
      target: 80000,
      percentage: 44,
      monthlyContribution: 1200,
      color: '#EF4444',
    },
    {
      goal: 'Retirement Fund',
      current: 45000,
      target: 100000,
      percentage: 45,
      monthlyContribution: 1000,
      color: '#06B6D4',
    },
  ];

  const cashFlowData = [
    { day: 'Mon', inflow: 200, outflow: -120 },
    { day: 'Tue', inflow: 150, outflow: -80 },
    { day: 'Wed', inflow: 300, outflow: -180 },
    { day: 'Thu', inflow: 180, outflow: -95 },
    { day: 'Fri', inflow: 420, outflow: -250 },
    { day: 'Sat', inflow: 100, outflow: -180 },
    { day: 'Sun', inflow: 80, outflow: -65 },
  ];

  const monthlyComparison = [
    { category: 'Income', thisMonth: 5100, lastMonth: 4900, percentage: 4.1 },
    { category: 'Fixed Expenses', thisMonth: 2200, lastMonth: 2150, percentage: 2.3 },
    { category: 'Variable Expenses', thisMonth: 1400, lastMonth: 1250, percentage: 12.0 },
    { category: 'Savings', thisMonth: 1500, lastMonth: 1500, percentage: 0 },
  ];

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    positive = true,
    subtitle,
    onClick,
    isHovered,
    className = '',
  }) => (
    <Card
      className={`group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] ${className}`}
      onMouseEnter={() => setHoveredCard(title)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={onClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main Content Layer */}
      <CardContent className="relative p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1 group-hover:text-gray-800 transition-colors duration-300">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900 group-hover:text-gray-950 transition-all duration-300">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                {subtitle}
              </p>
            )}
          </div>
          <div
            className={`p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${positive ? 'bg-gradient-to-br from-green-50 to-emerald-100 group-hover:from-green-100 group-hover:to-emerald-200' : 'bg-gradient-to-br from-red-50 to-rose-100 group-hover:from-red-100 group-hover:to-rose-200'}`}
          >
            <Icon
              className={`w-8 h-8 transition-all duration-500 ${positive ? 'text-green-600 group-hover:text-green-700' : 'text-red-600 group-hover:text-red-700'}`}
            />
          </div>
        </div>

        {/* Change Indicator */}
        <div
          className={`flex items-center text-sm font-medium transition-all duration-300 ${positive ? 'text-green-600 group-hover:text-green-700' : 'text-red-600 group-hover:text-red-700'}`}
        >
          {positive ? (
            <ArrowUpRight className="w-4 h-4 mr-1 group-hover:scale-125 transition-transform duration-300" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1 group-hover:scale-125 transition-transform duration-300" />
          )}
          <span className="group-hover:font-semibold transition-all duration-300">{change}</span>
        </div>
      </CardContent>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
    </Card>
  );

  const ChartCard = ({ title, children, className = '', info }) => (
    <Card
      className={`group bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900 group-hover:text-gray-950 transition-colors duration-300 text-lg font-semibold">
            {title}
          </CardTitle>
          {info && (
            <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
              {info}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">{children}</CardContent>
    </Card>
  );

  const ProgressBar = ({ percentage, color = 'bg-blue-500', height = 'h-3' }) => (
    <div
      className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden group-hover:bg-gray-300 transition-colors duration-300`}
    >
      <div
        className={`${height} ${color} transition-all duration-1000 ease-out rounded-full relative overflow-hidden`}
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  );

  const getIcon = (iconName) => {
    const icons = {
      Utensils,
      Car,
      ShoppingCart,
      Gamepad2,
      Zap,
      Heart,
      Home,
      ArrowRight,
    };
    return icons[iconName] || ArrowRight;
  };

  const CategoryCard = ({ category, index }) => {
    const IconComponent = getIcon(category.iconName);

    return (
      <div className="group p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:from-white hover:to-gray-50 transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg transition-all duration-300 group-hover:scale-110`}
              style={{ backgroundColor: `${category.color}20` }}
            >
              <IconComponent
                className={`w-5 h-5 transition-colors duration-300`}
                style={{ color: category.color }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-gray-950 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">
                ${category.value} / ${category.budget}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {Math.round((category.value / category.budget) * 100)}%
            </p>
            <p className="text-xs text-gray-500">${category.budget - category.value} left</p>
          </div>
        </div>
        <ProgressBar
          percentage={(category.value / category.budget) * 100}
          color={`${category.value / category.budget > 0.9 ? 'bg-red-500' : category.value / category.budget > 0.75 ? 'bg-yellow-500' : 'bg-green-500'}`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="max-w-8xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Comprehensive overview of your financial health</p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>June 2024</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>Last updated: 2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <StatCard
            title="Monthly Income"
            value="$5,100"
            change="+4.1% from last month"
            icon={DollarSign}
            subtitle="Primary & Secondary sources"
            positive={true}
            className="lg:col-span-1"
          />
          <StatCard
            title="Total Expenses"
            value="$3,600"
            change="+7.2% from last month"
            icon={CreditCard}
            subtitle="All categories combined"
            positive={false}
            className="lg:col-span-1"
          />
          <StatCard
            title="Net Savings"
            value="$1,500"
            change="Same as last month"
            icon={PiggyBank}
            subtitle="Available for investments"
            positive={true}
            className="lg:col-span-1"
          />
          <StatCard
            title="Investment Value"
            value="$27,700"
            change="+12.8% this month"
            icon={TrendingUp}
            subtitle="Total portfolio value"
            positive={true}
            className="lg:col-span-1"
          />
          <StatCard
            title="Goal Progress"
            value="49.2%"
            change="+3.1% this month"
            icon={Target}
            subtitle="Average across all goals"
            positive={true}
            className="lg:col-span-1"
          />
          <StatCard
            title="Budget Efficiency"
            value="82.4%"
            change="+2.1% improvement"
            icon={ArrowRight}
            subtitle="Spending vs planned"
            positive={true}
            className="lg:col-span-1"
          />
        </div>

        {/* Charts Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income vs Expenses Trend */}
          <ChartCard
            title="Income vs Expenses Trend"
            className="lg:col-span-2"
            info="Last 6 months"
          >
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Area
                  type="monotone"
                  dataKey="income"
                  stackId="1"
                  stroke="#10B981"
                  fill="url(#incomeGradient)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="2"
                  stroke="#EF4444"
                  fill="url(#expenseGradient)"
                  fillOpacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                />
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Investment Allocation */}
          <ChartCard title="Investment Portfolio" info="Current allocation">
            <ResponsiveContainer width="100%" height={350}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="80%"
                data={investmentData}
              >
                <RadialBar dataKey="percentage" cornerRadius={10} fill={(entry) => entry.color} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {investmentData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">${item.value.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Charts Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Spending */}
          <ChartCard title="Expense Categories" info="This month">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.slice(0, 6).map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Weekly Cash Flow */}
          <ChartCard title="Weekly Cash Flow" info="Current week">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Bar dataKey="inflow" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outflow" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Detailed Budget Progress */}
        <ChartCard title="Budget Overview by Category" info="Current month progress">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryData.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </div>
        </ChartCard>

        {/* Financial Goals Grid */}
        <ChartCard title="Financial Goals Progress" info="Track your long-term objectives">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goalProgress.map((goal, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:from-white hover:to-gray-50 transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-950 transition-colors duration-300">
                      {goal.goal}
                    </h3>
                    <p className="text-sm text-gray-500">+${goal.monthlyContribution}/month</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">{goal.percentage}%</span>
                  </div>
                </div>

                <ProgressBar
                  percentage={goal.percentage}
                  color={`bg-gradient-to-r ${goal.color} to-opacity-80`}
                  height="h-4"
                />

                <div className="flex justify-between text-sm text-gray-600 mt-3">
                  <span>${goal.current.toLocaleString()}</span>
                  <span>${goal.target.toLocaleString()}</span>
                </div>

                <div className="mt-3 p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors duration-300">
                  <div className="text-xs text-gray-500 mb-1">Remaining</div>
                  <div className="font-semibold text-gray-900">
                    ${(goal.target - goal.current).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ~{Math.ceil((goal.target - goal.current) / goal.monthlyContribution)} months to
                    go
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Monthly Comparison */}
        <ChartCard title="Month-over-Month Comparison" info="Current vs previous month">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monthlyComparison.map((item, index) => (
              <div
                key={index}
                className="group p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:from-white hover:to-gray-50 transition-all duration-500"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-950 transition-colors duration-300">
                  {item.category}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="font-medium">${item.thisMonth.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Month</span>
                    <span className="font-medium">${item.lastMonth.toLocaleString()}</span>
                  </div>
                  <div
                    className={`flex items-center justify-between pt-2 border-t border-gray-200 ${item.percentage > 0 ? 'text-red-600' : item.percentage < 0 ? 'text-green-600' : 'text-gray-600'}`}
                  >
                    <span className="text-sm font-medium">Change</span>
                    <div className="flex items-center">
                      {item.percentage > 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : item.percentage < 0 ? (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowRight className="w-4 h-4 mr-1" />
                      )}
                      <span className="font-medium">
                        {item.percentage > 0 ? '+' : ''}
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Weekly Spending Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Weekly Spending vs Target" info="Current month breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={weeklySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#EF4444"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Savings Rate Trend" info="Monthly savings as % of income">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={monthlyData.map((item) => ({
                  ...item,
                  savingsRate: ((item.savings / item.income) * 100).toFixed(1),
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Area
                  type="monotone"
                  dataKey="savingsRate"
                  stroke="#8B5CF6"
                  fill="url(#savingsGradient)"
                  fillOpacity={0.6}
                />
                <defs>
                  <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default FinanceStatistics;
