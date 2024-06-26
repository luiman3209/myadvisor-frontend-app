// services/serviceTypeService.ts

import { ServiceType } from '@/types/entity/service_type_entity';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

export const getServiceTypes = async () => {
  try {
    const response = await axios.get(`/api/services`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const serviceTypes = response.data as ServiceType[];

    return serviceTypes;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch service types');
    } else {

      throw new Error('Failed to fetch service types due to an unexpected error');
    }
  }
};


export const getServiceTypeById = async (serviceId: number): Promise<ServiceType> => {
  try {
    const response = await axios.get(`/api/services/${serviceId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const serviceType = response.data as ServiceType;

    return serviceType;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch service types');
    } else {

      throw new Error('Failed to fetch service types due to an unexpected error');
    }
  }
};