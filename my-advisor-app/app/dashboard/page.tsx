"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CircularProgress from '@/components/misc/CircularProgress';
import Navbar from '@/components/navbar/NavBar';

import { AppointmentDto, FilteredAppointmentsResp, FilteredReviewsResp, ReviewDto } from '@/types/types';
import { deleteAppointment, filterAdvisorAppointments } from '@/services/appointmentService';
import { filterAdvisorReviews } from '@/services/reviewService';

import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/footer/Footer';
import { useServiceContext } from '@/contexts/ServicesContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import AdvisorReviewBox from '@/components/dashboard/AdvisorReviewBox';
import AdvisorAppointmentBox from '@/components/dashboard/AdvisorAppointmentBox';
import { Card } from '@/components/ui/card';


const DashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentDto[]>([]);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [updateMessage, setUpdateMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { user } = useAuth();

  const { availableServices } = useServiceContext();


  const router = useRouter();

  const showSuccess = (message: string) => {
    setUpdateMessage(message);
    setTimeout(() => {
      setUpdateMessage('');
    }, 5000);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const requestAppointmentDeletion = async (appointmentId: number) => {

    try {
      await deleteAppointment(appointmentId);
      showSuccess('Appointment deleted successfully');
    } catch (e) {
      showError('Failed to delete appointment');
      console.error(e);
    }
  };

  useEffect(() => {

    const fetchAdvisorData = async () => {
      if (user) {
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
        {/** Message alert */}
        {
          errorMessage && <div className="fixed bottom-0 right-0 mb-4 mr-4">
            <Alert className="bg-red-500 text-white">
              <Info className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          </div>
        }
        {/** Success alert */}
        {
          updateMessage && <div className="fixed bottom-0 right-0 mb-4 mr-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                {updateMessage}
              </AlertDescription>
            </Alert>
          </div>
        }
        <Card className="items-center p-8">

          <section>
            <h2 className="text-2xl font-bold mb-4">Next appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <AdvisorAppointmentBox
                    key={appointment.appointment_id}
                    appointment={appointment}
                    service={availableServices.find((s) => s.service_id === appointment.service_id)}
                    requestAppointmentDeletion={requestAppointmentDeletion} isInvestorType={user?.role === 'investor'} />

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
                  <AdvisorReviewBox key={review.review_id} review={review} />
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </section>


        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
