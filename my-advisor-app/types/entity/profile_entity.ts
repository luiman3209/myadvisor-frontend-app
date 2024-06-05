import { ProfileVisibilityEnum } from '../enums';

export class ProfileEntity {
    profile_id: number;
    user_id: number;
    first_name: string | null;
    last_name: string | null;
    phone_number: string | null;
    address: string | null;
    preferences: string | null;
    visibility: ProfileVisibilityEnum;
    created_at: Date;
    updated_at: Date;

    constructor(
        profile_id: number,
        user_id: number,
        first_name: string | null,
        last_name: string | null,
        phone_number: string | null,
        address: string | null,
        preferences: string | null,
        visibility: ProfileVisibilityEnum,
        created_at: Date,
        updated_at: Date
    ) {
        this.profile_id = profile_id;
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.address = address;
        this.preferences = preferences;
        this.visibility = visibility;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}