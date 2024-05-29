// services/investorService.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const createOrUpdateInvestor = async (profileData: any) => {
  try {
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
