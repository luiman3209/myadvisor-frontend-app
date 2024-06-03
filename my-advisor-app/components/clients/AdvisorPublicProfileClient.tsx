// components/clients/AdvisorPublicProfileClient.tsx
"use client";

import { useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './AdvisorPublicProfile.module.css';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import BookAppointment from '@/components/book_appointment/BookAppointment';
import { getFreeWindows } from '@/services/appointmentService';
import { AdvisorPublicProfileProps } from '@/types/types';

const AdvisorPublicProfileClient: React.FC<AdvisorPublicProfileProps> = ({
  advisor,
  profileReviews,
  serviceTypes,
  offices,
  initialDays,
  initialAvailableTimes,
  selectedOffice,
  selectedService,
  selectedDay,
  selectedTime,
}) => {
  const [days, setDays] = useState<string[]>(initialDays);
  const [availableTimes, setAvailableTimes] = useState<{ [key: string]: string[] }>(initialAvailableTimes);
  const [showBookAppointment, setShowBookAppointment] = useState<boolean>(selectedDay ? true  : false);

  const fetchAvailableTimes = useCallback(async (newDays: string[]) => {
    try {
      const startDate = newDays[0];
      const endDate = newDays[newDays.length - 1].concat('T23:59:59Z');
      const times = await getFreeWindows(advisor.advisor_id, startDate, endDate);
      setAvailableTimes(times);
    } catch (error) {
      console.error('Failed to fetch available times:', error);
    }
  }, [advisor.advisor_id]);

  const updateDaysAndFetch = useCallback((direction: 'next' | 'prev' | 'none') => {
    const currentStartDate = new Date(days[0]);
    const newStartDate = new Date(currentStartDate);

    if(direction === 'none') {
      fetchAvailableTimes(days);
      return;
    }

    if (direction === 'next') {
      newStartDate.setDate(currentStartDate.getDate() + 5);
    } else {
      newStartDate.setDate(currentStartDate.getDate() - 5);
    }

    // Prevent navigating to past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight
    if (newStartDate < today) {
      newStartDate.setDate(today.getDate());
    }

    const newDays = getNextDays(5, newStartDate);
    setDays(newDays);
    fetchAvailableTimes(newDays);
  }, [days, fetchAvailableTimes]);

  const handleBookMeetingClick = () => {
    setShowBookAppointment(true);
  };

  if (!advisor) return <div>Error: Advisor not found</div>;

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
          {showBookAppointment && advisor.advisor_id && (
            <div className={styles.bookAppointmentContainer}>
              <BookAppointment
                advisorId={advisor.advisor_id}
                offices={offices}
                services={serviceTypes}
                days={days}
                availableTimes={availableTimes}
                onNavigateDays={updateDaysAndFetch}
                selectedOffice={selectedOffice}
                selectedService={selectedService}
                selectedDay={selectedDay}
                selectedTime={selectedTime}
              />
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
                <li key={service}>{service}</li>
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

function getNextDays(days: number, startDate: Date = new Date()): string[] {
  const result = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    result.push(date.toISOString().split('T')[0]);
  }
  return result;
}

export default AdvisorPublicProfileClient;
