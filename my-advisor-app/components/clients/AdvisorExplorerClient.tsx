// components/AdvisorExplorerClient.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import { AdvisorSearchResultResp } from '@/types/types';
import RatingStars from '../RatingStars';
import BoxCollection from '../misc/BoxCollection';
import { ServiceType } from '@/types/entity/service_type_entity';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, MapPin, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import BookAppointment from '../book_appointment/BookAppointment';
import BookAppointmentV2 from '../book_appointment/BookAppointmentV2';


interface AdvisorExplorerProps {
  initialAdvisors: AdvisorSearchResultResp[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  serviceTypes: ServiceType[];
}

const AdvisorExplorerClient: React.FC<AdvisorExplorerProps> = ({ initialAdvisors, totalItems, totalPages, currentPage, serviceTypes }) => {

  const [advisors, setAdvisors] = useState<AdvisorSearchResultResp[]>(initialAdvisors);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="  py-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Advisor Explorer</h1>
            <p className="mt-2">Search results for advisors based on your criteria.</p>
          </div>
        </div>
      </div>
      {loading && <p className="text-center my-4">Loading...</p>}
      {error && <p className="text-center text-red-500 my-4">{error}</p>}
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <ul className="space-y-4">
            {advisors.map((advisor) => (
              <li key={advisor.advisor_id} className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300 ">

                <div className='flex flex-col  md:flex-row'>
                  <div className='flex flex-col space-y-2 '>

                    <div className="flex flex-row ">
                      <div className='w-1/6 items-center'>

                        <Avatar>
                          <AvatarImage src={advisor.img_url} alt="profile" />
                          <AvatarFallback>{advisor.display_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex flex-row items-center">
                        <div className="flex flex-col space-y-2">
                          <Link href={`/advisor/profile?advisorId=${advisor.advisor_id}`} className="text-xl font-semibold  hover:underline">
                            {advisor.display_name}
                          </Link>
                          <RatingStars rating={5} />
                          <BoxCollection
                            items={serviceTypes.filter(s => advisor.advisor_services.map(a => a.service_id).includes(s.service_id)).map(s => s.service_type_name)}
                          />

                        </div>
                      </div>


                    </div>

                    <Tabs defaultValue="address" className="w-[400px]">
                      <TabsList className=''>
                        <TabsTrigger value="address">Address</TabsTrigger>
                        <TabsTrigger value="online"><Video className='w-4 h-4 pr-1' /> Online </TabsTrigger>
                      </TabsList>
                      <TabsContent value="address" className='flex '><MapPin className='w-6 h-6 pr-1' /> <a target='_blank' href={'https://www.google.com/maps/search/'.concat(advisor.office_address)}>{advisor.office_address}</a> </TabsContent>
                      <TabsContent value="online">Online consultation $100.</TabsContent>
                    </Tabs>

                  </div>

                  <div className='bg-red-200'>
                    <BookAppointmentV2
                      advisorId={advisor.advisor_id}
                      officeAddress={advisor.office_address}
                      services={serviceTypes.filter(s => advisor.advisor_services.map(a => a.service_id).includes(s.service_id))}
                    />

                  </div>
                </div>


              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvisorExplorerClient;
