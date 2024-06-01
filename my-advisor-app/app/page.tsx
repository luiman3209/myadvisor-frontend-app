// app/page.tsx
import HomeClient from '@/components/HomeClient';
import { getServiceTypes } from '@/services/serviceTypesService';

// This is a server component by default
export default async function Home() {
  // Fetch service types on the server side
  let serviceTypes = [];
  try {
    serviceTypes = await getServiceTypes();
  } catch (error) {
    console.error('Failed to fetch service types', error);
  }

  return <HomeClient serviceTypes={serviceTypes} />;
}
