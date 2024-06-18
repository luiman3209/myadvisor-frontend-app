import { AppointmentDto, ReviewDto } from "@/types/types";
import { Card } from "../ui/card";
import AdvisorAppointmentBox from "./AdvisorAppointmentBox";
import AdvisorReviewBox from "./AdvisorReviewBox";
import { ServiceType } from "@/types/entity/service_type_entity";




interface AdvisorDashboardProps {
    appointments: AppointmentDto[];
    reviews: ReviewDto[];
    availableServices: ServiceType[];
}

const AdvisorDashboard: React.FC<AdvisorDashboardProps> = ({ appointments, reviews, availableServices }) => {

    return (<Card className="items-center p-8">

        <section>
            <h2 className="text-2xl font-bold mb-4">Next appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <AdvisorAppointmentBox key={appointment.appointment_id} appointment={appointment} service={availableServices.find((s) => s.service_id === appointment.service_id)} />

                    ))
                ) : (
                    <p>No appointments scheduled.</p>
                )}
            </div>
        </section>
        <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-4">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <AdvisorReviewBox key={review.review_id} review={review} />
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </section>


    </Card>);
}


export default AdvisorDashboard;