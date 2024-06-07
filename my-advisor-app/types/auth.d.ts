export interface User {
    id: string;
    email: string;
    role: 'advisor' | 'investor';
}



export interface CommonProfileData {
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;

}

export interface InvestorProfileData {
    net_worth: string;
    income_range: string;
    geo_preferences: string;
    serviceTypes: ServiceType[];
}

export interface AdvisorProfileData {
    qualifications: number[];
    contact_information: string;
    start_shift_1: string;
    end_shift_1: string;
    start_shift_2: string?;
    end_shift_2: string?;
    operating_country_code: string;
    operating_city_code: string;
    display_name: string;
    office_address: string;
    serviceTypes: ServiceType[];
}


export interface ProfileData {
    common_data: CommonProfileData;
    investor_data?: InvestorProfileData;
    advisor_data?: AdvisorProfileData;
}