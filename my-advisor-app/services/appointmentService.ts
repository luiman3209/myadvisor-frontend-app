import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const bookAppointment = async (advisor_id: number, start_time: string, end_time: string) => {
  try {
    const response = await axios.post(
      '/api/appointment/book',
      { advisor_id, start_time, end_time },
      headers()
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to book appointment');
    } else {
      throw new Error('Failed to book appointment due to an unexpected error');
    }
  }
};

export const getFreeWindows = async (advisorId: number | null, startDate: string, endDate: string) => {
  if (!advisorId || !startDate || !endDate) return;
  console.log('Fetching free windows for advisor:', advisorId, 'from', startDate, 'to', endDate);
  try {
    const response = await axios.post(`/api/appointment/free-windows/${advisorId}`, { startDate, endDate });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to get free windows');
    } else {
      throw new Error('Failed to get free windows due to an unexpected error');
    }
  }
};
