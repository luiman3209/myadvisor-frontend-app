"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CircularProgress from '@/components/misc/CircularProgress';
import Navbar from '@/components/navbar/NavBar';

import { AppointmentDto, FilteredAppointmentsResp, FilteredReviewsResp, ReviewDto } from '@/types/types';
import { filterAdvisorAppointments } from '@/services/appointmentService';
import { filterAdvisorReviews } from '@/services/reviewService';


const DashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentDto[]>([]);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
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
    };

    fetchData();
  }, []);

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
      <div className="md:my-8 mx-auto p-12 lg:w-1/2">
        <section>
          <h2 className="text-2xl font-bold mb-4">Appointments Manager</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                appointment.start_time.toString()
              ))
            ) : (
              <p>No appointments scheduled.</p>
            )}
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="grid gap-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                review.review
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
