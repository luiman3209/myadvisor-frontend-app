// services/profileService.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getProfile = async () => {
  try {
    const response = await axios.get('/api/profile', headers());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch profile');
    } else {
      throw new Error('Failed to fetch profile due to an unexpected error');
    }
  }
};

export const updateProfile = async (profileData: any) => {
  try {
    const response = await axios.put('/api/profile', profileData, headers());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to update profile');
    } else {
      throw new Error('Failed to update profile due to an unexpected error');
    }
  }
};
