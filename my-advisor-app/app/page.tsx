"use client";

import React, { useEffect, useState } from 'react';
import HomeClient from '@/components/HomeClient';
import { getLastReviews } from '@/services/reviewService';
import { getServiceTypes } from '@/services/serviceTypesService';
import { ServiceType } from '@/types/entity/service_type_entity';
import { HomeReviewDto } from '@/types/types';

export default function Home() {
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [latestReviews, setLatestReviews] = useState<HomeReviewDto[]>([]);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedServiceTypes = await getServiceTypes();
        const fetchedLatestReviews = await getLastReviews(6);
        setServiceTypes(fetchedServiceTypes);
        setLatestReviews(fetchedLatestReviews);
      } catch (error) {
        if (retryCount < 5) { // limit the number of retries
          setTimeout(() => {
            setRetryCount(retryCount + 1);
          }, 5000);
        }
      }
    };

    fetchData();
  }, [retryCount]); // re-run the effect when `retryCount` changes

  return <HomeClient serviceTypes={serviceTypes} latestReviews={latestReviews} />;
}