// app/advisor-explorer/page.tsx

import AdvisorExplorerClient from '@/components/clients/AdvisorExplorerClient';
import { searchAdvisors } from '@/services/searchService';
import { SearchParams } from '@/types/types';


export default async function AdvisorExplorerPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { operating_country_code, service_id } = searchParams;

  let initialAdvisors = [];
  try {
    if (operating_country_code || service_id) {
      initialAdvisors = await searchAdvisors(operating_country_code, service_id ? Number(service_id) : undefined);
    }
  } catch (error) {
    console.error('Failed to fetch advisors', error);
  }

  return (
    <AdvisorExplorerClient
      initialAdvisors={initialAdvisors}
      operatingCountryCode={operating_country_code || null}
      serviceId={service_id ? Number(service_id) : undefined}
    />
  );
}
