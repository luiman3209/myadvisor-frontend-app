export class ReviewEntity {
    review_id: number;
    user_id: number;
    advisor_id: number;
    appointment_id: number;
    rating: number;
    review: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        review_id: number,
        user_id: number,
        advisor_id: number,
        appointment_id: number,
        rating: number,
        review: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.review_id = review_id;
        this.user_id = user_id;
        this.advisor_id = advisor_id;
        this.appointment_id = appointment_id;
        this.rating = rating;
        this.review = review;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}