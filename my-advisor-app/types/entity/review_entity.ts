export interface ReviewEntity {
    review_id: number;
    user_id: number;
    advisor_id: number;
    appointment_id: number;
    rating: number;
    review: string;
    created_at: Date;
    updated_at: Date;


}