export const FormattedDate = ({ date }: { date: string | Date }) => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) return <span>Invalid date</span>;

  return (
    <span className="text-muted-foreground text-sm whitespace-nowrap">
      {parsedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </span>
  );
};
