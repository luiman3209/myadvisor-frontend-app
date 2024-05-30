import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { getServiceTypes } from '@/services/serviceTypesService';
import { useState, useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);

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
            <form style={{ marginTop: '20px' }}>
              <input type="text" placeholder="Search..." style={{ padding: '10px', width: '300px' }} />
              <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>Search</button>
            </form>
          </div>
          <div>
            <img src="/images/subjects.png" alt="Subjects" style={{ width: '400px', height: 'auto' }} />
          </div>
        </div>
      </div>
      <div style={{ padding: '50px', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
          <h2>Ask for guidance</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {serviceTypes.map((service) => (
              <a href="#" key={service.service_id} style={{ margin: '10px', color: '#333', textDecoration: 'none', border: '1px solid #ddd', borderRadius: '5px', padding: '10px 15px', backgroundColor: '#fafafa' }}>
                {service.service_type_name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
