"use client";

import React, { useEffect, useState } from 'react';
import HomeClient from '@/components/HomeClient';
import { getLastReviews } from '@/services/reviewService';
import { getServiceTypes } from '@/services/serviceTypesService';
import { ServiceType } from '@/types/entity/service_type_entity';
import { HomeReviewDto } from '@/types/types';
import { useServiceContext } from '@/contexts/ServicesContext';

export default function Home() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [latestReviews, setLatestReviews] = useState<HomeReviewDto[]>([]);


  const { availableServices } = useServiceContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedLatestReviews = await getLastReviews(6);
        setServiceTypes(availableServices);
        setLatestReviews(fetchedLatestReviews);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []); // re-run the effect when `retryCount` changes

  return <HomeClient serviceTypes={serviceTypes} latestReviews={latestReviews} />;
}