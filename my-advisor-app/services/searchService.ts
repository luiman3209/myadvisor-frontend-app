import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const searchAdvisors = async (operating_country_code?: string, service_id?: number) => {
  try {
    const params: any = {};
    if (operating_country_code) {
      params.operating_country_code = operating_country_code;
    }
    if (service_id) {
      params.service_id = service_id;
    }

    const response = await axios.get('/api/search/advisors', { params, ...headers() });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to search advisors');
    } else {
      throw new Error('Failed to search advisors due to an unexpected error');
    }
  }
};
