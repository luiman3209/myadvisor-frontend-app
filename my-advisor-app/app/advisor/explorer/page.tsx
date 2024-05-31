// app/advisor-explorer/page.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchAdvisors } from '@/services/searchService';
import Link from 'next/link';

import styles from './AdvisorExplorer.module.css';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';


const AdvisorExplorer: React.FC = () => {
  const router = useRouter();
  const [operatingCountryCode, setOperatingCountryCode] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<number | undefined>(undefined);

  const [advisors, setAdvisors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const operatingCountryCodeParam = params.get('operating_country_code');
    const serviceIdParam = params.get('service_id');

    setOperatingCountryCode(operatingCountryCodeParam);
    setServiceId(serviceIdParam ? Number(serviceIdParam) : undefined);
  }, [router]);

  useEffect(() => {
    const fetchAdvisors = async () => {
      if (operatingCountryCode || serviceId) {
        setLoading(true);
        setError(null);

        try {
          const result = await searchAdvisors(
            operatingCountryCode as string,
            serviceId
          );
          setAdvisors(result);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAdvisors();
  }, [operatingCountryCode, serviceId]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Advisor Explorer</h1>
            <p>Search results for advisors based on your criteria.</p>
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.resultsContainer}>
        <div className={styles.results}>
          <h2>Search Results</h2>
          <ul>
            {advisors.map((advisor) => (
              <li key={advisor.advisor_id} className={styles.advisor}>
                <Link href={`/advisor/profile?advisorId=${advisor.advisor_id}`}>
                  <span className={styles.advisorName}>
                    {advisor.profile.first_name} {advisor.profile.last_name} - {advisor.expertise}
                  </span>
                </Link>
                <p>
                  <strong>Contact information:</strong> {advisor.contact_information} <br />
                  <strong>Office Address:</strong> {advisor.office_address} <br />
                  <strong>Operating City Code:</strong> {advisor.operating_city_code} <br />
                  <strong>Operating Country Code:</strong> {advisor.operating_country_code}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvisorExplorer;
