"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPublicAdvisorProfile } from '@/services/advisorService';
import Link from 'next/link';
import styles from './AdvisorPublicProfile.module.css';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import BookAppointment from '@/components/book_appointment/BookAppointment';

const AdvisorPublicProfile: React.FC = () => {
  const router = useRouter();
  const [advisorId, setAdvisorId] = useState<number | null>(null);
  const [advisor, setAdvisor] = useState<any>(null);
  const [profileReviews, setProfileReviews] = useState<any[]>([]);
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookAppointment, setShowBookAppointment] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const advisorIdParam = params.get('advisorId');
    setAdvisorId(advisorIdParam ? Number(advisorIdParam) : null);
  }, [router]);

  useEffect(() => {
    if (advisorId !== null) {
      const fetchAdvisor = async () => {
        console.log('fetching advisor');
        setLoading(true);
        setError(null);

        try {
          const data = await getPublicAdvisorProfile(advisorId);
          console.log(data);
          setAdvisor(data.advisor);
          setProfileReviews(data.profileReviews);
          setServiceTypes(data.serviceTypes);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAdvisor();
    }
  }, [advisorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleBookMeetingClick = () => {
    setShowBookAppointment(true);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.breadcrumb}>
        <Link href="/">Homepage</Link> /
        <Link href="/advisor"> Advisor </Link> /
        <Link href="/advisor/new-york"> New York </Link> /
        <Link href="/advisor/new-york/michael-scott"> Michael Scott </Link>
      </div>
      <div className={styles.main}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <h1>{advisor.first_name} {advisor.last_name}</h1>
              <p>Expertise: {advisor.expertise}</p>
              <p>Office Address: {advisor.office_address}</p>
            </div>
            <div className={styles.profileImage}>
              <img src="/images/profile.jpg" alt="Profile" />
            </div>
          </div>
          <div className={styles.profileActions}>
            <button className={styles.button} onClick={handleBookMeetingClick}>Book a meeting</button>
            <button className={styles.button}>Send a message</button>
          </div>
          {showBookAppointment && (
            <div className={styles.bookAppointmentContainer}>
              <BookAppointment />
            </div>
          )}
          <div className={styles.additionalInfo}>
            <p><strong>Contact info:</strong> {advisor.contact_information}</p>
            <p><strong>Operating City Code:</strong> {advisor.operating_city_code}</p>
            <p><strong>Operating Country Code:</strong> {advisor.operating_country_code}</p>
            <p><strong>Qualifications:</strong> {advisor.qualifications}</p>
            <p><strong>Start Shift 1:</strong> {new Date(advisor.start_shift_1).toLocaleString()}</p>
            <p><strong>End Shift 1:</strong> {new Date(advisor.end_shift_1).toLocaleString()}</p>
            {advisor.start_shift_2 && <p><strong>Start Shift 2:</strong> {new Date(advisor.start_shift_2).toLocaleString()}</p>}
            {advisor.end_shift_2 && <p><strong>End Shift 2:</strong> {new Date(advisor.end_shift_2).toLocaleString()}</p>}
            <p><strong>Verified:</strong> {advisor.is_verified === 'Y' ? 'Yes' : 'No'}</p>

            <h2>Service Types</h2>
            <ul>
              {serviceTypes.map((service: any) => (
                <li key={service.service_id}>{service.service_type_name}</li>
              ))}
            </ul>

            <h2>Reviews</h2>
            {profileReviews.map((review: any) => (
              <div key={review.id} className={styles.review}>
                <p><strong>Rating:</strong> {review.rating}</p>
                <p>{review.review}</p>
                <p><strong>By:</strong> {review.User.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvisorPublicProfile;
