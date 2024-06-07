import { ShiftTimeEnum, VerificationStatusEnum } from '../enums';

export interface AdvisorEntity {
    advisor_id: number;
    user_id: number;
    display_name: string;
    office_address: string;
    operating_city_code: string;
    operating_country_code: string;
    contact_information: string;
    start_shift_1: ShiftTimeEnum;
    end_shift_1: ShiftTimeEnum;
    start_shift_2: ShiftTimeEnum;
    end_shift_2: ShiftTimeEnum;
    profile_views: number;
    is_verified: VerificationStatusEnum;
    created_at: Date;
    updated_at: Date;
    img_url: string;
}