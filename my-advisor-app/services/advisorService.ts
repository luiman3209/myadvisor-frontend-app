import { AdvisorProfileData } from '@/types/auth';
import { AdvisorEntity } from '@/types/entity/advisor_entity';
import { AdvisorPrivateProfileRespDto, AdvisorPublicProfileDto } from '@/types/types';
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

export const getAdvisorProfile = async (): Promise<AdvisorPrivateProfileRespDto> => {
  try {
    const response = await axios.get('/api/advisor', headers());
    return response.data as AdvisorPrivateProfileRespDto;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch advisor profile');
    } else {
      throw new Error('Failed to fetch advisor profile due to an unexpected error');
    }
  }
};

export const getPublicAdvisorProfile = async (advisorId: number): Promise<AdvisorPublicProfileDto> => {
  try {
    const response = await axios.get(`/api/advisor/${advisorId}`);
    return response.data as AdvisorPublicProfileDto;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch public advisor profile');
    } else {
      throw new Error('Failed to fetch public advisor profile due to an unexpected error');
    }
  }
};


export const getAdvisorBookInfo = async (advisorId: number): Promise<AdvisorEntity> => {
  try {
    const response = await axios.get(`/api/advisor/book-info/${advisorId}`);
    return response.data as AdvisorEntity;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch public advisor profile');
    } else {
      throw new Error('Failed to fetch public advisor profile due to an unexpected error');
    }
  }
};
