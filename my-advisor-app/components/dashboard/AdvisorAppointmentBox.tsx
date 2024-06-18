import { AppointmentDto } from "@/types/types";
import { formatDateToUTCString } from "@/utils/dateUtils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Check, Mail, X } from "lucide-react";
import { appointmentStatusOrder } from "@/utils/constants";


interface AdvisorAppointmentBox {
    appointment: AppointmentDto;
    serviceName: string;
}

const AdvisorAppointmentBox: React.FC<AdvisorAppointmentBox> = ({ appointment, serviceName }) => {

    return (<Card className="items-center">

        <div className=" items-center p-4 space-y-2">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">{formatDateToUTCString(appointment.start_time, "MMM d, yyyy")}</p>
                    <h1 className="text-sm text-gray-500">{serviceName}</h1>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{appointment.user_config.profile.first_name}</p>
                    {appointment.status === 'completed' && <div className="text-sm flex items-center text-gray-500">Is reviewed: {appointment.is_reviewed ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}</div>}

                </div>

            </div>
            <div className="justify-right">
                <Button className="px-3 py-1 text-sm text-white bg-cyan-500 rounded-md"><Mail className="w-4 h-4 mr-1.5" />Chat</Button>
            </div>
        </div>


    </Card>);
}



export default AdvisorAppointmentBox;