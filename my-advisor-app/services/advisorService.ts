import { AdvisorProfileData } from '@/types/auth';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const createOrUpdateAdvisor = async (profileData: AdvisorProfileData) => {
  try {
    const response = await axios.put('/api/advisor', profileData, headers());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to create or update advisor profile');
    } else {
      throw new Error('Failed to create or update advisor profile due to an unexpected error');
    }
  }
};

export const getAdvisorProfile = async () => {
  try {
    const response = await axios.get('/api/advisor', headers());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch advisor profile');
    } else {
      throw new Error('Failed to fetch advisor profile due to an unexpected error');
    }
  }
};

export const getPublicAdvisorProfile = async (advisorId: number) => {
  try {
    const response = await axios.get(`/api/advisor/${advisorId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch public advisor profile');
    } else {
      throw new Error('Failed to fetch public advisor profile due to an unexpected error');
    }
  }
};
