// components/HomeClient.tsx
"use client";

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { CalendarCheck } from 'lucide-react';
import { Separator } from './ui/separator';

interface HomeClientProps {
  serviceTypes: any[];
}

const HomeClient: React.FC<HomeClientProps> = ({ serviceTypes }) => {
  const [operatingCountryCode, setOperatingCountryCode] = useState('');
  const [selectedServiceName, setSelectedServiceName] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (operatingCountryCode) query.append('operating_country_code', operatingCountryCode);

    // find the service_id by selected service_name
    if (selectedServiceName) {
      serviceTypes.forEach((type) => {
        if (type.service_type_name === selectedServiceName) {
          query.append('service_id', type.service_id.toString());
        }
      });
    }

    router.push(`/advisor/explorer?${query.toString()}`);
  };

  return (
    <div className='flex flex-col min-h-screen bg-cyan-500'>
      <Navbar />
      <main className="flex-grow flex-col">

        <div className="p-12 bg-transparent relative">
          <div className="flex flex-col items-center md:mb-24">
            <div className='w-full md:w-8/12 lg:w-1/4 md:ml-96 mt-72 md:mt-48 lg:mt-0'>
              <img src="/images/subjects.png" alt="Subjects" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-0  p-4 bg-transparent text-white px-12 md:px-36 lg:px-[400px] py-6 lg:py-[150px] lg:w-[1500px] ">
              <h1 className="text-3xl font-semibold mb-4">Book your appointment online!</h1>
              <p className="mb-6 text-xl font-base">Search among thousands of Financial Advisors.</p>
              <form onSubmit={handleSearch} className="mt-5">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <Input
                    type="text"
                    placeholder="Country Code"
                    value={operatingCountryCode}
                    onChange={(e) => setOperatingCountryCode(e.target.value)}
                    className="text-black text-base md:w-5/12"
                  />
                  <Select value={selectedServiceName || ''} onValueChange={(e) => setSelectedServiceName(e)}>
                    <SelectTrigger className="md:w-5/12 text-slate-600 text-base" >
                      <SelectValue placeholder="Service Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {serviceTypes.map((type) => (
                          <SelectItem className="text-base text-black" key={type.service_id} value={type.service_type_name}>
                            {type.service_type_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Button type="submit" className="md:w-2/12 p-2 mt-4 bg-white hover:bg-cyan text-black text-base rounded">
                    Search
                  </Button>
                </div>

              </form>
            </div>
          </div>
        </div>
        <div className=''>
          <div className="flex flex-col mx-8 md:mx-2 my-2 md:my-4 md:px-96 bg-white">
            <CardHeader>
              <CardTitle>Available services by certified advisors</CardTitle>
              <CardDescription>Pick the service based on your needs.</CardDescription>
            </CardHeader>
            <CardContent className=' space-x-1 md:space-x-2 space-y-0 md:space-y-1'>
              {serviceTypes.map((type) => (
                <Button variant="outline" key={'button'.concat(type.service_id)}>
                  {type.service_type_name}
                </Button>
              ))}


            </CardContent>

            <Separator className="my-4" />

            <div className="flex flex-col md:flex-row">
              <div className="flex flex-row space-x-2">
                <CalendarCheck />
                <span>Accept terms and conditions</span>
              </div>
            </div>

          </div>


        </div>




      </main>
      <Footer />
    </div>
  );
};

export default HomeClient;
