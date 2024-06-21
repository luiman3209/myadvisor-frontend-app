"use client";

import { useEffect, useState } from 'react';

import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';

import { HomeReviewDto } from '@/types/types';


import { ServiceType } from '@/types/entity/service_type_entity';
import { useServiceContext } from '@/contexts/ServicesContext';
import { getLastReviews } from '@/services/reviewService';

import { Separator } from '@/components/ui/separator';

import HomeLatestReviews from '@/components/home/HomeLatestReviews';
import HomeCTAs from '@/components/home/HomeCTAs';
import HomeAvailableServices from '@/components/home/HomeAvailableServices';
import HomeAdvisorBanner from '@/components/home/HomeAdvisorBanner';
import HomeSearchArea from '@/components/home/HomeSearchArea';


export default function Home() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [latestReviews, setLatestReviews] = useState<HomeReviewDto[]>([]);

  const { availableServices } = useServiceContext();


  useEffect(() => {
    setServiceTypes(availableServices);
  }, [availableServices]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedLatestReviews: HomeReviewDto[] = await getLastReviews(6);
        setLatestReviews(fetchedLatestReviews);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  return <div className=' flex flex-col min-h-screen '>
    <Navbar />
    <main className="flex-grow flex-col">

      {/* ********************** Main area ********************** */}

      <HomeSearchArea serviceTypes={serviceTypes} />

      {/* ********************** White section ********************** */}

      <HomeAvailableServices serviceTypes={serviceTypes} />

      <Separator className="my-4" />

      <HomeCTAs />

      <Separator className="my-4" />

      <HomeLatestReviews latestReviews={latestReviews} />

      <Separator className="my-4" />

      <HomeAdvisorBanner />

    </main >
    <Footer />
  </div >;
}