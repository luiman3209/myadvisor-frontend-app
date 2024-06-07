// services/investorService.ts
import { InvestorProfileData } from '@/types/auth';
import { InvestorProfileDto } from '@/types/types';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const createOrUpdateInvestor = async (profileData: InvestorProfileData) => {
  try {
    console.log('profileData', profileData)
    const response = await axios.put('/api/investor', profileData, headers());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to create or update investor profile');
    } else {
      throw new Error('Failed to create or update investor profile due to an unexpected error');
    }
  }
};

export const getInvestorProfile = async (): Promise<InvestorProfileDto> => {
  try {
    const response = await axios.get('/api/investor', headers());


    return response.data as InvestorProfileDto;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch investor profile');
    } else {
      throw new Error('Failed to fetch investor profile due to an unexpected error');
    }
  }
};
