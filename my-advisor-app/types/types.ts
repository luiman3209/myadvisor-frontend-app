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


export interface AdvisorReviewDto {
  review_id: number;
  review: string;
  rating: number;
  created_at: Date;
  user_config: UserFirstNameDto;


}

export interface UserFirstNameDto {

  profile: {
    first_name: string;
  };
}
export interface AdvisorPublicProfileDto {
  advisor: AdvisorEntity;
  freeWindows: { [key: string]: string[] };
  profileReviews: AdvisorReviewDto[];
  serviceTypes: ServiceType[];
  qualifications: QualificationEntity[];
  offices: string[];
  average_rating: number;
  review_count: number;

}

export interface ReviewFilterReq {


  page: number;
  limit: number;
  sort_type: string | null;
  sort_by: string | null;
  min_rating: number | null;
  max_rating: number | null;
  min_date: string | null;
  max_date: string | null;
  has_text: boolean | null;


}

export interface AppointmentsFilterReq {


  page: number;
  limit: number;
  sort_type: string;
  min_date: string | null;
  max_date: string | null;
  service_id: number | null;

}


export interface FilteredAppointmentsResp {

  totalItems: number;
  totalPages: number;
  currentPage: number;
  appointments: AppointmentDto[];
}

export interface AppointmentDto {
  appointment_id: number;
  user_id: number;
  service_id: number;
  start_time: Date;
  end_time: Date;
  is_reviewed: boolean;
  status: string;
  user_config: UserFirstNameDto;
  advisor: AdvisorDisplayNameDto;
}

// ['review_id', 'user_id', 'appointment_id', 'rating', 'review', 'created_at']

export interface ReviewDto {

  review_id: number;
  user_id: number;
  appointment_id: number;
  rating: number;
  review: string;
  created_at: Date;
  user_config: UserFirstNameDto;

}

export interface AdvisorDisplayNameDto {
  advisor_id: number;
  display_name: string;
}

export interface FilteredReviewsResp {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  reviews: ReviewDto[];
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
  average_rating: number;
  review_count: number;

  advisor_services: number[];

  free_windows: { [key: string]: string[] };

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
  advisor: {
    advisor_id: number;
    display_name: string;
    img_url: string;
  },
  user_config: UserFirstNameDto;

}