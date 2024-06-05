// app/page.tsx
import HomeClient from '@/components/HomeClient';
import { getLastReviews } from '@/services/reviewService';
import { getServiceTypes } from '@/services/serviceTypesService';
import { HomeReviewDto } from '@/types/types';

// This is a server component by default
export default async function Home() {
  // Fetch service types on the server side
  let serviceTypes = [];
  let latestReviews: HomeReviewDto[] = [];

  serviceTypes = await getServiceTypes();
  latestReviews = await getLastReviews(6);


  return <HomeClient serviceTypes={serviceTypes} latestReviews={latestReviews} />;
}
