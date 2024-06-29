'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import { AdvisorSearchResultResp, SearchAdvisorsRespDto } from '@/types/types';

import { searchAdvisors } from '@/services/searchService';

import { Loader } from 'lucide-react';

import { useServiceContext } from '@/contexts/ServicesContext';
import ExplorerSearchBar from '@/components/explorer/ExplorerSearchBar';
import ExplorerResultList from '@/components/explorer/ExplorerResultList';
import { Button } from '@/components/ui/button';

const SearchParamsHandler: React.FC = () => {
  const searchParams = useSearchParams();
  const [countryCode, setCountryCode] = useState<string | undefined>();
  const [serviceId, setServiceId] = useState<number | undefined>();

  useEffect(() => {
    const initialCountryCode = searchParams.get('country_code');
    const initialServiceId = searchParams.get('service_id');

    if (initialCountryCode) setCountryCode(initialCountryCode);
    if (initialServiceId) setServiceId(parseInt(initialServiceId, 10));
  }, [searchParams]);

  return <AdvisorExplorerContent initialCountryCode={countryCode} initialServiceId={serviceId} />;
};

const AdvisorExplorerContent: React.FC<{ initialCountryCode?: string, initialServiceId?: number }> = ({ initialCountryCode, initialServiceId }) => {
  const [advisors, setAdvisors] = useState<AdvisorSearchResultResp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [countryCode, setCountryCode] = useState<string | undefined>(initialCountryCode);
  const [serviceId, setServiceId] = useState<number | undefined>(initialServiceId);

  const { availableServices } = useServiceContext();

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError(null);
      try {
        const result: SearchAdvisorsRespDto = await searchAdvisors(countryCode, serviceId, page);
        setAdvisors(result.advisors);
        setPage(result.currentPage);
        setTotalPages(result.totalPages);
        setTotalItems(result.totalItems);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch advisors');
      }
      setLoading(false);
    };

    if (serviceId || countryCode) handleSearch();
  }, [serviceId, countryCode, page]);

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ExplorerSearchBar
          availableServices={availableServices}
          serviceId={serviceId}
          setServiceId={setServiceId}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
        <div className="flex-grow container 2xl:ml-64 px-4 py-6">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            {loading && (
              <div className="flex justify-center my-4">
                <Loader className="animate-spin w-8 h-8 text-cyan-600" />
              </div>
            )}
            {error && <p className="text-center text-red-500 my-4">{error}</p>}
            {!loading && !error && (
              <ExplorerResultList advisors={advisors} availableServices={availableServices} />
            )}
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            {page !== 1 && (
              <Button
                className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
            )}
            {advisors.length > 0 && page !== totalPages && (
              <Button
                className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400"
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const AdvisorExplorer: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader className="animate-spin w-8 h-8 text-cyan-600" />
      </div>
    }>
      <SearchParamsHandler />
    </Suspense>
  );
};

export default AdvisorExplorer;
