"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPublicAdvisorProfile } from '@/services/advisorService';

import CircularProgress from '@/components/misc/CircularProgress';
import Navbar from '@/components/navbar/NavBar';
import BookAppointmentV2 from '@/components/book_appointment/BookAppointmentV2';
import { AdvisorEntity } from '@/types/entity/advisor_entity';
import { Card } from '@/components/ui/card';
import { AdvisorPublicProfileDto, AdvisorReviewDto } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import RatingStars from '@/components/RatingStars';
import BoxCollection from '@/components/misc/BoxCollection';
import { ServiceType } from '@/types/entity/service_type_entity';

const AdvisorPublicProfilePage: React.FC = () => {
  const [advisor, setAdvisor] = useState<AdvisorEntity | null>(null);
  const [profileReviews, setProfileReviews] = useState<AdvisorReviewDto[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [offices, setOffices] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [reviewsCount, setReviewsCount] = useState<number | null>(null);


  const searchParams = useSearchParams();

  const advisorId = searchParams.get('advisor');


  useEffect(() => {
    const fetchAdvisorData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (advisorId) {
          const data: AdvisorPublicProfileDto = await getPublicAdvisorProfile(Number(advisorId));
          setAdvisor(data.advisor);
          setProfileReviews(data.profileReviews);
          setServiceTypes(data.serviceTypes);
          setOffices(data.offices);

          setAverageRating(data.average_rating);
          setReviewsCount(data.review_count);

        }
      } catch (error) {
        console.error('Failed to fetch advisor profile', error);
        setError('Failed to fetch advisor profile');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisorData();
  }, [advisorId]);

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
    <div className='bg-gray-100'>
      <Navbar />
      <Card className=" md:my-8 mx-auto p-12 lg:w-1/2">
        {advisor ? (
          <div className="">
            <div className="flex items-center space-x-8 ">
              <Avatar className='w-24 h-24'>
                <AvatarImage src={advisor.img_url} alt="profile" />
                <AvatarFallback>{advisor.display_name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='space-y-1'>
                <h1 className="text-2xl font-bold">
                  {advisor.display_name}
                </h1>
                <div className='flex flex-row items-center space-x-2'>

                  {reviewsCount && averageRating && reviewsCount > 0 ?
                    <RatingStars initialRating={averageRating} /> : <div></div>}

                  <span className='text-gray-500 text-xs'>{reviewsCount} Reviews</span>
                </div>
                <BoxCollection
                  items={serviceTypes.filter(s => serviceTypes.map(a => a.service_id).includes(s.service_id)).map(s => s.service_type_name)}
                />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold">Offices</h3>
              <ul>
                {offices.map((office, index) => (
                  <li key={index}>{office}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold">Book an appointment</h3>
              <BookAppointmentV2 advisorId={advisor.advisor_id} officeAddress={advisor.office_address} services={serviceTypes} />
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold">What people think about {advisor.display_name}...</h2>
              {profileReviews.length === 0 ? <p>No reviews yet.</p> :
                <ul>
                  {profileReviews.map((review, index) => (
                    <li key={index}>{review.review}</li>
                  ))}
                </ul>}
            </div>
          </div>
        ) : (
          <div className="text-center">
            No advisor found with the given ID.
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdvisorPublicProfilePage;
