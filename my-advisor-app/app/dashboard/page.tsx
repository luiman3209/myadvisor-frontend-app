"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CircularProgress from '@/components/misc/CircularProgress';
import Navbar from '@/components/navbar/NavBar';

import { AppointmentDto, FilteredAppointmentsResp, FilteredReviewsResp, ReviewDto } from '@/types/types';
import { filterAdvisorAppointments } from '@/services/appointmentService';
import { filterAdvisorReviews } from '@/services/reviewService';
import AdvisorDashboard from '@/components/dashboard/AdvisorDashboard';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/footer/Footer';
import { useServiceContext } from '@/contexts/ServicesContext';


const DashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentDto[]>([]);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const { availableServices } = useServiceContext();


  const router = useRouter();

  useEffect(() => {

    const fetchAdvisorData = async () => {
      if (user) {
        setLoading(true);
        setError(null);

        try {
          console.log('Fetching advisor data..')
          // Fetch appointments data
          const appointmentsData: FilteredAppointmentsResp = await filterAdvisorAppointments(
            {
              page: 1,
              limit: 5,
              sort_type: 'asc',
              min_date: new Date().toISOString(),
              max_date: null,
              service_id: null,
            }
          );

          setAppointments(appointmentsData.appointments);

          // Fetch reviews data
          const reviewsData: FilteredReviewsResp = await filterAdvisorReviews(
            {
              page: 1,
              limit: 5,
              sort_type: 'desc',
              sort_by: 'created_at',
              min_rating: null,
              max_rating: null,
              min_date: null,
              max_date: null,
              has_text: null,
            }
          );

          setReviews(reviewsData.reviews);
        } catch (error) {
          console.error('Failed to fetch dashboard data', error);
          setError('Failed to fetch dashboard data');
        } finally {
          setLoading(false);
        }
      }

    };

    fetchAdvisorData();
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <CircularProgress size={100} strokeWidth={10} initialProgress={0} interval={100} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {error}. Please try reloading the page.
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="h-auto mx-auto p-12 lg:w-1/2 flex flex-col min-h-screen">
        <AdvisorDashboard appointments={appointments} reviews={reviews} availableServices={availableServices} />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
