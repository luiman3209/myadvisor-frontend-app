import { AppointmentsFilterReq, FilteredAppointmentsResp } from '@/types/types';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const bookAppointment = async (advisor_id: number, service_id: number, start_time: string, end_time: string) => {
  try {
    const response = await axios.post(
      '/api/appointment/book',
      { advisor_id, service_id, start_time, end_time },
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


export const filterAdvisorAppointments = async (filter: AppointmentsFilterReq): Promise<FilteredAppointmentsResp> => {

  try {

    const response = await axios.post(`/api/appointment/advisor`,
      filter,
      headers());
    return response.data as FilteredAppointmentsResp;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to retrieve appointments');
    } else {
      throw new Error('Failed to retrieve appointments due to an unexpected error');
    }
  }
};
