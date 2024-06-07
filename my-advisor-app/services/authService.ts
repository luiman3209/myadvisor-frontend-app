// services/authService.ts
import axios from 'axios';
import jwtDecode from '../utils/jwtDecode';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

export const login = async (email: string, password: string) => {
  try {

    const response = await axios.post('/api/auth/login', { email, password });

    const token = response.data.token;
    localStorage.setItem('token', token);
    return jwtDecode(token);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {

      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('Login failed due to an unexpected error');
    }
  }
};

export const register = async (email: string, password: string, role: string) => {
  try {
    await axios.post('/api/auth/register', { email, password, role });
    return login(email, password);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    } else {
      throw new Error('Registration failed due to an unexpected error');
    }
  }
};


export const logout = () => {
  localStorage.removeItem('token');
};

export const checkEmailAvailability = async (email: string) => {
  try {

    const response = await axios.post('/api/auth/check-email', { email });

    return response.data.available;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {

      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('Login failed due to an unexpected error');
    }
  }
};

export const checkPhoneAvailability = async (phone_number: string) => {
  try {

    const response = await axios.post('/api/auth/check-phone', { phone_number });

    return response.data.available;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {

      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('Login failed due to an unexpected error');
    }
  }
};
