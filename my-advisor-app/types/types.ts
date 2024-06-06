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

export interface AdvisorPublicProfileProps {
  advisor: any;
  profileReviews: any[];
  serviceTypes: string[];
  offices: string[];
  initialDays: string[];
  initialAvailableTimes: { [key: string]: string[] };
  selectedOffice?: string;
  selectedService?: string;
  selectedDay?: string;
  selectedTime?: string;
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