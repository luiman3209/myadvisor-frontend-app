import { ProfileVisibilityEnum } from '../enums';

export interface ProfileEntity {
    profile_id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    visibility: ProfileVisibilityEnum;
    created_at: Date;
    updated_at: Date;

}