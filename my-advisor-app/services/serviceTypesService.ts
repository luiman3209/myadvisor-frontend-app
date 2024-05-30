// services/serviceTypeService.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getServiceTypes = async () => {
  try {
    const response = await axios.get('/api/services', headers());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch service types');
    } else {
      throw new Error('Failed to fetch service types due to an unexpected error');
    }
  }
};
