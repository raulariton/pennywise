// components/molecules/MetricCardsGrid.tsx
import MetricCard from '../organisms/MetricCard';
import MetricChart from '../atoms/MetricChart';

interface MetricCardData {
  title: string;
  value: string;
  subtitle: string;
  backTitle: string;
  backSubtitle: string;
  icon: string;
  trendValue: string;
}

export const MetricCardsGrid: React.FC<{ cards: MetricCardData[] }> = ({ cards }) => (
  <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {cards.map((card, idx) => (
      <MetricCard
        key={idx}
        title={card.title}
        value={card.value}
        subtitle={card.subtitle}
        backTitle={card.backTitle}
        backSubtitle={card.backSubtitle}
        icon={card.icon}
        trendValue={card.trendValue}
      >
        <div className="h-full">
          <MetricChart type="spending" />
        </div>
      </MetricCard>
    ))}
  </section>
);
