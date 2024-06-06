// services/serviceTypeService.ts
import { QualificationEntity } from '@/types/entity/qualification_entity';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});


export const getAvailableQualifications = async (): Promise<QualificationEntity[]> => {
  try {
    const response = await axios.get(`/api/qualifications`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const qualifications = response.data as QualificationEntity[];

    return qualifications;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch qualifications');
    } else {

      throw new Error('Failed to fetch qualifications due to an unexpected error');
    }
  }
};