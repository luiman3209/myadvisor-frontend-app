import { SearchAdvisorsRespDto } from '@/types/types';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;



export const searchAdvisors = async (operating_country_code?: string,
  service_id?: number,
  page: number = 1,
  limit: number = 10,

): Promise<SearchAdvisorsRespDto> => {
  try {
    const params: any = {};
    if (operating_country_code) {
      params.operating_country_code = operating_country_code;
    }
    if (service_id) {
      params.service_id = service_id;
    }
    params.page = page;
    params.limit = limit;

    const response = await axios.get('/api/search/advisors', { params });
    return response.data as SearchAdvisorsRespDto;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to search advisors');
    } else {
      throw new Error('Failed to search advisors due to an unexpected error');
    }
  }
};
