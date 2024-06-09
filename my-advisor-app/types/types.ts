import { AdvisorEntity } from "./entity/advisor_entity";
import { ProfileEntity } from "./entity/profile_entity";
import { QualificationEntity } from "./entity/qualification_entity";
import { ReviewEntity } from "./entity/review_entity";
import { ServiceType } from "./entity/service_type_entity";

// types.ts
export interface SearchParams {
  operating_country_code?: string;
  service_id?: string;
}

export interface AdvisorExplorerProps {
  initialAdvisors: any[];
  operatingCountryCode: string | null;
  serviceId: number | undefined;
}

export interface AdvisorSearchParams {
  advisorId: number;
  selectedOffice?: string;
  selectedService?: string;
  selectedDay?: string;
  selectedTime?: string;
}



export interface SearchAdvisorsRespDto {

  totalItems: number;
  totalPages: number;
  currentPage: number;
  advisors: AdvisorSearchResultResp[];

}

export interface AdvisorSearchResultResp {
  advisor_id: number;
  display_name: string;
  contact_information: string;
  operating_city_code: string;
  operating_country_code: string;
  office_address: string;
  img_url: string;

  advisor_services: {
    service_id: number;
  }[];

  free_windows: { key: string, value: string }[];

}

export interface InvestorProfileDto {
  investor: InvestorDto;
  userProfile: ProfileEntity;
  serviceTypes: ServiceType[];
}

export interface AdvisorPrivateProfileRespDto {
  advisor: AdvisorDto;
  serviceTypes: number[];
  qualifications: number[];
  profileReviews: ReviewEntity[];
  userProfile: ProfileEntity;
}

export interface InvestorDto {
  investor_id: number;
  user_id: number;
  net_worth: string;
  income_range: string;
  geo_preferences: string;
  created_at: Date;
  updated_at: Date;

  user_config: {
    email: string;
    created_at: Date;
  }

}

export interface AdvisorDto {
  advisor_id: number;
  user_id: number;
  display_name: string;
  office_address: string;
  operating_city_code: string;
  operating_country_code: string;
  contact_information: string;
  start_shift_1: string;
  end_shift_1: string;
  start_shift_2: string;
  end_shift_2: string;

  created_at: Date;
  updated_at: Date;

  user_config: {
    email: string;
    created_at: Date;
  }

}

export interface HomeReviewDto {
  review_id: number;
  user_id: number;
  advisor_id: number;
  appointment_id: number;
  rating: number;
  review: string;
  created_at: Date;
  updated_at: Date;
  advisor_display_name: string;
  advisor_img_url: string;
  reviewer_first_name: string;
}