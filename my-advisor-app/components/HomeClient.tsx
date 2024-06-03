// components/HomeClient.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import { Button } from './ui/button';

interface HomeClientProps {
  serviceTypes: any[];
}

const HomeClient: React.FC<HomeClientProps> = ({ serviceTypes }) => {
  const [operatingCountryCode, setOperatingCountryCode] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState<number | undefined>(undefined);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (operatingCountryCode) query.append('operating_country_code', operatingCountryCode);
    if (selectedServiceType) query.append('service_id', selectedServiceType.toString());
    router.push(`/advisor/explorer?${query.toString()}`);
  };

  return (
    <div className='flex flex-col min-h-screen bg-cyan-500'>
      <Navbar />
      <main className="flex-grow">
        <div className="p-12 bg-transparent">
          <div className="flex flex-col md:flex-row justify-center items-center mb-12">
            <div className="text-left md:mr-5 mb-8 md:mb-0 text-white">
              <h1 className="text-3xl font-semibold mb-4">Book your appointment online!</h1>
              <p className="mb-6 text-xl font-base">Search among thousands of Financial Advisors.</p>
              <form onSubmit={handleSearch} className="mt-5">
                <input
                  type="text"
                  placeholder="Country Code"
                  value={operatingCountryCode}
                  onChange={(e) => setOperatingCountryCode(e.target.value)}
                  className="p-2 mb-4 md:mb-0 md:mr-4 border border-gray-300 rounded"
                />
                <select
                  value={selectedServiceType || ''}
                  onChange={(e) => setSelectedServiceType(Number(e.target.value) || undefined)}
                  className="p-2 mb-4 md:mb-0 md:mr-4 border border-gray-300 rounded"
                >
                  <option value="" disabled>Select Service Type</option>
                  {serviceTypes.map((type) => (
                    <option key={type.service_id} value={type.service_id}>
                      {type.service_type_name}
                    </option>
                  ))}
                </select>
                <Button className="p-2 bg-white hover:bg-cyan text-black rounded ">Search</Button>

              </form>
            </div>
            <div>
              <img src="/images/subjects.png" alt="Subjects" className="w-80 h-auto" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeClient;
