'use client';

import PageTemplate from '@/components/templates/PageTemplate';
import useApiClientPrivate from '@/hooks/useApiClientPrivate';

export default function DashboardPage() {
  const apiClientPrivate = useApiClientPrivate();

  return (
    <PageTemplate>
      Coming soon :)
    </PageTemplate>
  );
}
