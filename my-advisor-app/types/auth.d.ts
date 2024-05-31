export interface User {
    id: string;
    email: string;
    role: 'advisor' | 'investor';
}

export interface ServiceType {
    service_id: number;
    service_type_name: string;
    service_type_code: string;
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
    qualifications: string;
    expertise: string;
    contact_information: string;
    start_shift_1: string;
    end_shift_1: string;
    start_shift_2: string;
    end_shift_2: string;
    operating_country_code: string;
    operating_city_code: string;
    office_address: string;
    serviceTypes: ServiceType[];
}


export interface ProfileData {
    common_data: CommonProfileData;
    investor_data?: InvestorProfileData;
    advisor_data?: AdvisorProfileData;
}