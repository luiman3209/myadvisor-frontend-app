import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getInvestorDashboard = async () => {
  try {
    const response = await axios.get('/api/dashboard/investor', headers());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch investor dashboard');
    } else {
      throw new Error('Failed to fetch investor dashboard due to an unexpected error');
    }
  }
};

export const getAdvisorDashboard = async () => {
  try {
    const response = await axios.get('/api/dashboard/advisor', headers());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch advisor dashboard');
    } else {
      throw new Error('Failed to fetch advisor dashboard due to an unexpected error');
    }
  }
};
