import { ShiftTimeEnum, VerificationStatusEnum } from '../enums';

export class AdvisorEntity {
    advisor_id: number;
    user_id: number;
    display_name: string;
    qualifications: string | null;
    expertise: string | null;
    office_address: string;
    operating_city_code: string;
    operating_country_code: string;
    contact_information: string | null;
    start_shift_1: ShiftTimeEnum;
    end_shift_1: ShiftTimeEnum;
    start_shift_2: ShiftTimeEnum | null;
    end_shift_2: ShiftTimeEnum | null;
    profile_views: number;
    is_verified: VerificationStatusEnum;
    created_at: Date;
    updated_at: Date;
    img_url: string | null;

    constructor(
        advisor_id: number,
        user_id: number,
        display_name: string,
        qualifications: string | null,
        expertise: string | null,
        office_address: string,
        operating_city_code: string,
        operating_country_code: string,
        contact_information: string | null,
        start_shift_1: ShiftTimeEnum,
        end_shift_1: ShiftTimeEnum,
        start_shift_2: ShiftTimeEnum | null,
        end_shift_2: ShiftTimeEnum | null,
        profile_views: number,
        is_verified: VerificationStatusEnum,
        created_at: Date,
        updated_at: Date,
        img_url: string | null
    ) {
        this.advisor_id = advisor_id;
        this.user_id = user_id;
        this.display_name = display_name;
        this.qualifications = qualifications;
        this.expertise = expertise;
        this.office_address = office_address;
        this.operating_city_code = operating_city_code;
        this.operating_country_code = operating_country_code;
        this.contact_information = contact_information;
        this.start_shift_1 = start_shift_1;
        this.end_shift_1 = end_shift_1;
        this.start_shift_2 = start_shift_2;
        this.end_shift_2 = end_shift_2;
        this.profile_views = profile_views;
        this.is_verified = is_verified;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.img_url = img_url;
    }
}