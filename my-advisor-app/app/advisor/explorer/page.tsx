"use client";
import { useEffect, useState } from 'react';

import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import { AdvisorSearchResultResp, SearchAdvisorsRespDto } from '@/types/types';

import { searchAdvisors } from '@/services/searchService';

import { Loader } from 'lucide-react';

import { useSearchParams } from 'next/navigation';
import { useServiceContext } from '@/contexts/ServicesContext';
import ExplorerSearchBar from '@/components/explorer/ExplorerSearchBar';
import ExplorerResultList from '@/components/explorer/ExplorerResultList';
import { Button } from '@/components/ui/button';


const AdvisorExplorer: React.FC = () => {
  const [advisors, setAdvisors] = useState<AdvisorSearchResultResp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<number | undefined>();
  const [countryCode, setCountryCode] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const searchParams = useSearchParams();

  const { availableServices } = useServiceContext();

  useEffect(() => {


    const initialCountryCode = searchParams.get('country_code');
    const initialServiceId = searchParams.get('service_id');

    if (initialCountryCode) setCountryCode(initialCountryCode);
    if (initialServiceId) setServiceId(parseInt(initialServiceId, 10));

  }, [searchParams]);

  const handleSearch = async () => {
    setLoading(true);

    // wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    setError(null);
    try {
      const result: SearchAdvisorsRespDto = await searchAdvisors(countryCode, serviceId, page);
      setAdvisors(result.advisors);
      setPage(result.currentPage);
      setTotalPages(result.totalPages);
      setTotalItems(result.totalItems);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (serviceId || countryCode)
      handleSearch();
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
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>

            {loading && (
              <div className="flex justify-center my-4">
                <Loader className="animate-spin w-8 h-8 text-cyan-600" />
              </div>
            )}
            {error && <p className="text-center text-red-500 my-4">{error}</p>}
            {!loading && !error && <ExplorerResultList
              advisors={advisors}
              availableServices={availableServices}
            />}

          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <Button
              className="px-4 py-2 rounded"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              className="px-4 py-2  rounded"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>

      </div>
      <Footer />
    </div>

  );
};

export default AdvisorExplorer;