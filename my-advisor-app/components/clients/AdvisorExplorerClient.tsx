// components/AdvisorExplorerClient.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import styles from './AdvisorExplorer.module.css';
import { AdvisorExplorerProps } from '@/types/types';

const AdvisorExplorerClient: React.FC<AdvisorExplorerProps> = ({
  initialAdvisors,
  operatingCountryCode,
  serviceId,
}) => {
  const [advisors, setAdvisors] = useState<any[]>(initialAdvisors);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

export default AdvisorExplorerClient;
