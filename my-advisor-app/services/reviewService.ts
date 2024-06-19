import { ReviewEntity } from '@/types/entity/review_entity';
import { FilteredReviewsResp, HomeReviewDto, ReviewFilterReq } from '@/types/types';
import axios from 'axios';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

axios.defaults.baseURL = API_URL;

const headers = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const getLastReviews = async (limit = 10): Promise<HomeReviewDto[]> => {
    try {
        const params = { limit };
        const response = await axios.get('/api/reviews/latest-reviews', { params });
        return response.data as HomeReviewDto[];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Failed to retrieve reviews');
        } else {
            throw new Error('Failed to retrieve reviews due to an unexpected error');
        }
    }
};


export const filterAdvisorReviews = async (filter: ReviewFilterReq): Promise<FilteredReviewsResp> => {
    try {

        const response = await axios.post('/api/reviews/filter', filter, headers());
        return response.data as FilteredReviewsResp;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Failed to retrieve reviews');
        } else {
            throw new Error('Failed to retrieve reviews due to an unexpected error');
        }
    }
};


export const reviewAppointment = async (appointmentId: number, rating: number, review: string): Promise<ReviewEntity> => {

    try {

        const response = await axios.post(`/api/advisor/review/`, {
            appointmentId,
            rating,
            review,
        }, headers());

        return response.data as ReviewEntity;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Failed to retrieve appointments');
        } else {
            throw new Error('Failed to retrieve appointments due to an unexpected error');
        }
    }
};