import { AppointmentDto, ReviewDto } from "@/types/types";
import { Card } from "../ui/card";
import AdvisorAppointmentBox from "./AdvisorAppointmentBox";




interface AdvisorDashboardProps {
    appointments: AppointmentDto[];
    reviews: ReviewDto[];
}

const AdvisorDashboard: React.FC<AdvisorDashboardProps> = ({ appointments, reviews, }) => {

    return (<Card className="items-center p-8">

        <section>
            <h2 className="text-2xl font-bold mb-4">Next appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <AdvisorAppointmentBox key={appointment.appointment_id} appointment={appointment} serviceName="Service Name" />

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
                        review.review
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </section>


    </Card>);
}


export default AdvisorDashboard;