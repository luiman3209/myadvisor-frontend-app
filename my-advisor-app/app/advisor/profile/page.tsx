// app/advisor-public-profile/page.tsx

import AdvisorPublicProfileClient from '@/components/clients/AdvisorPublicProfileClient';
import { getPublicAdvisorProfile } from '@/services/advisorService';
import { getFreeWindows } from '@/services/appointmentService';
import { AdvisorSearchParams, AdvisorPublicProfileProps } from '@/types/types';

export default async function AdvisorPublicProfilePage({
  searchParams,
}: {
  searchParams: AdvisorSearchParams;
}) {
  const { advisorId, selectedOffice, selectedService, selectedDay, selectedTime } = searchParams;

  let advisor = null;
  let profileReviews = [];
  let serviceTypes = [];
  let offices = [];
  let availableTimes = {};
  let days = getNextDays(5);

  try {
    if (advisorId) {
      const data = await getPublicAdvisorProfile(Number(advisorId));
      advisor = data.advisor;
      profileReviews = data.profileReviews;
      serviceTypes = data.serviceTypes.map((service: any) => service.service_type_name);
      offices = data.offices.map((office: any) => office.office_name);
      availableTimes = await getFreeWindows(Number(advisorId), days[0], days[days.length - 1].concat('T23:59:59Z'));
    }
  } catch (error) {
    console.error('Failed to fetch advisor profile', error);
  }

  return (
    <AdvisorPublicProfileClient
      advisor={advisor}
      profileReviews={profileReviews}
      serviceTypes={serviceTypes}
      offices={offices}
      initialDays={days}
      initialAvailableTimes={availableTimes}
      selectedOffice={selectedOffice}
      selectedService={selectedService}
      selectedDay={selectedDay}
      selectedTime={selectedTime}
    />
  );
}

function getNextDays(days: number, startDate: Date = new Date()): string[] {
  const result = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    result.push(date.toISOString().split('T')[0]);
  }
  return result;
}
