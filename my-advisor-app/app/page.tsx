// app/page.tsx
"use client";

import Footer from '@/components/footer/Footer';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServiceTypes } from '@/services/serviceTypesService';
import Navbar from '@/components/navbar/NavBar';

export default function Home() {
  const { user } = useAuth();
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [operatingCountryCode, setOperatingCountryCode] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Fetch service types
    const fetchServiceTypes = async () => {
      try {
        const types = await getServiceTypes();
        setServiceTypes(types);
      } catch (error) {
        console.error('Failed to fetch service types', error);
      }
    };

    fetchServiceTypes();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (operatingCountryCode) query.append('operating_country_code', operatingCountryCode);
    if (selectedServiceType) query.append('service_id', selectedServiceType.toString());
    router.push(`/advisor/explorer?${query.toString()}`);
  };

  return (
    <div style={{ backgroundColor: '#189AB4' }}>
      <div style={{ backgroundColor: 'transparent' }}>
        <Navbar />
      </div>
      <div style={{ padding: '50px', color: 'white', backgroundColor: 'transparent' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
          <div style={{ textAlign: 'left', marginRight: '20px' }}>
            <h1>Book your appointment online!</h1>
            <p>Search among thousands of Financial Advisors.</p>
            <form onSubmit={handleSearch} style={{ marginTop: '20px' }}>
              <input
                type="text"
                placeholder="Country Code"
                value={operatingCountryCode}
                onChange={(e) => setOperatingCountryCode(e.target.value)}
                style={{ padding: '10px', marginRight: '10px' }}
              />
              <select
                value={selectedServiceType || ''}
                onChange={(e) => setSelectedServiceType(Number(e.target.value) || undefined)}
                style={{ padding: '10px', marginRight: '10px' }}
              >
                <option value="" disabled>Select Service Type</option>
                {serviceTypes.map((type) => (
                  <option key={type.service_id} value={type.service_id}>
                    {type.service_type_name}
                  </option>
                ))}
              </select>
              <button type="submit" style={{ padding: '10px 20px' }}>Search</button>
            </form>
          </div>
          <div>
            <img src="/images/subjects.png" alt="Subjects" style={{ width: '400px', height: 'auto' }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
