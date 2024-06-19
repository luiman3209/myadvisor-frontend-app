"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import { AdvisorSearchResultResp, SearchAdvisorsRespDto } from '@/types/types';

import { getServiceTypes } from '@/services/serviceTypesService';
import { ServiceType } from '@/types/entity/service_type_entity';
import { searchAdvisors } from '@/services/searchService';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CountryPicker } from '@/components/input/CountryPicker';
import { Loader, MapPin, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import RatingStars from '@/components/RatingStars';
import BoxCollection from '@/components/misc/BoxCollection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookAppointmentV2 from '@/components/book_appointment/BookAppointmentV2';
import { useSearchParams } from 'next/navigation';
import { useServiceContext } from '@/contexts/ServicesContext';


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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="py-4 bg-gray-100 border-b justify-center items-center">
        <div className="container mx-auto px-4 flex space-x-4">
          <Select value={availableServices.find(s => s.service_id === serviceId)?.service_type_name || ''} onValueChange={(e) => setServiceId(availableServices.find(s => s.service_type_name === e)?.service_id || undefined)}>
            <SelectTrigger className=" text-slate-600 text-base">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableServices.map((type) => (
                  <SelectItem className="text-base text-black" key={type.service_id} value={type.service_type_name}>
                    {type.service_type_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <CountryPicker countryCode={countryCode} setCountryCode={setCountryCode} />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center my-4">
          <Loader className="animate-spin w-8 h-8 text-cyan-600" />
        </div>
      )}
      {error && <p className="text-center text-red-500 my-4">{error}</p>}
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <ul className="space-y-6">
            {advisors.map((advisor) => (
              <li key={advisor.advisor_id} className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-col space-y-4 md:w-1/3">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={advisor.img_url} alt="profile" />
                        <AvatarFallback>{advisor.display_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className='space-y-1'>
                        <Link href={`/advisor/profile?advisor=${advisor.advisor_id}`} className="text-xl font-semibold hover:underline">
                          {advisor.display_name}
                        </Link>
                        <div className='flex flex-row items-center space-x-2'>
                          {advisor.average_rating > 0 &&
                            <RatingStars initialRating={advisor.average_rating} />}<span className='text-gray-500 text-xs'>{advisor.review_count} Reviews</span>
                        </div>
                        <BoxCollection
                          items={availableServices.filter(s => advisor.advisor_services.map(a => a.service_id).includes(s.service_id)).map(s => s.service_type_name)}
                        />
                      </div>
                    </div>
                    <Tabs defaultValue="address" className="w-full text-sm">
                      <TabsList className="flex space-x-2">
                        <TabsTrigger value="address" className="flex-1">Address</TabsTrigger>
                        <TabsTrigger value="online" className="flex-1"><Video className="w-4 h-4 pr-1" />Online</TabsTrigger>
                      </TabsList>
                      <TabsContent value="address" className="flex items-center space-x-2 mt-2">
                        <MapPin className="w-6 h-6" />
                        <a target="_blank" href={`https://www.google.com/maps/search/${advisor.office_address}`} className="text-blue-500 hover:underline">
                          {advisor.office_address}
                        </a>
                      </TabsContent>
                      <TabsContent value="online" className="mt-2">
                        Online consultation
                      </TabsContent>
                    </Tabs>
                  </div>
                  <div className="md:w-2/3 mt-4 md:mt-0 border-l-2 ml-2">
                    <BookAppointmentV2
                      advisorId={advisor.advisor_id}
                      officeAddress={advisor.office_address}
                      services={availableServices.filter(s => advisor.advisor_services.map(a => a.service_id).includes(s.service_id))}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvisorExplorer;