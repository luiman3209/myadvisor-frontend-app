// app/advisor-explorer/page.tsx

import AdvisorExplorerClient from '@/components/clients/AdvisorExplorerClient';
import { searchAdvisors } from '@/services/searchService';
import { getServiceTypes } from '@/services/serviceTypesService';
import { ServiceType } from '@/types/entity/service_type_entity';
import { SearchAdvisorsRespDto, SearchParams } from '@/types/types';


export default async function AdvisorExplorerPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { operating_country_code, service_id } = searchParams;

  let searchResult: SearchAdvisorsRespDto = {
    advisors: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0
  };

  let serviceTypes: ServiceType[] = [];

  try {
    if (operating_country_code || service_id) {
      searchResult = await searchAdvisors(operating_country_code, service_id ? Number(service_id) : undefined);
    }

    serviceTypes = await getServiceTypes();
  } catch (error) {
    console.error('Failed to fetch advisors', error);
  }

  return (
    <AdvisorExplorerClient
      initialAdvisors={searchResult.advisors} totalItems={searchResult.totalItems} totalPages={searchResult.totalPages} currentPage={searchResult.currentPage}
      serviceTypes={serviceTypes}
    />
  );
}
