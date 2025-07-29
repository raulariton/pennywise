// components/organisms/ExpensesMetrics.tsx
import { OverviewChartSection } from '../molecules/OverviewChartSection';
import { MetricCardsGrid } from '../molecules/MetricCardsGrid';

interface Props {
  mainData: any[];
  cards: any[];
}

export const ExpensesMetrics: React.FC<Props> = ({ mainData, cards }) => (
  <div className="relative z-10 mx-auto max-w-7xl px-8 py-16">
    <OverviewChartSection data={mainData} />
    <MetricCardsGrid cards={cards} />
  </div>
);
