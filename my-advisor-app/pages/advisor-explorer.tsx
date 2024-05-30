import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchAdvisors } from '@/services/searchService';
import Link from 'next/link';

const AdvisorExplorer: React.FC = () => {
  const router = useRouter();
  const { operating_country_code, service_id } = router.query;

  const [advisors, setAdvisors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvisors = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await searchAdvisors(operating_country_code as string, service_id ? Number(service_id) : undefined);
        setAdvisors(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (operating_country_code || service_id) {
      fetchAdvisors();
    }
  }, [operating_country_code, service_id]);

  return (
    <div style={{ backgroundColor: '#189AB4' }}>
      <div style={{ backgroundColor: 'transparent' }}>
        <Navbar />
      </div>
      <div style={{ padding: '50px', color: 'white', backgroundColor: 'transparent' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
          <div style={{ textAlign: 'left', marginRight: '20px' }}>
            <h1>Advisor Explorer</h1>
            <p>Search results for advisors based on your criteria.</p>
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ padding: '50px', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
          <h2>Search Results</h2>
          <ul>
            {advisors.map((advisor) => (
              <li key={advisor.advisor_id} style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                <Link href={`/advisor-profile?advisorId=${advisor.advisor_id}`}>
                  <h3 style={{ color: '#0070f3', textDecoration: 'underline', cursor: 'pointer' }}>{advisor.profile.first_name} {advisor.profile.last_name} - {advisor.expertise}</h3>
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
