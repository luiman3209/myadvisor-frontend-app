import { AppointmentDto } from "@/types/types";
import { formatDateToUTCString } from "@/utils/dateUtils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CalendarX2, Check, CircleAlert, Mail, X } from "lucide-react";
import { appointmentStatusOrder } from "@/utils/constants";
import { ServiceType } from "@/types/entity/service_type_entity";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { deleteAppointment } from "@/services/appointmentService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import RatingStars from "../RatingStars";


interface AdvisorAppointmentBox {
    appointment: AppointmentDto;
    service: ServiceType | undefined;
    requestAppointmentDeletion: (appointmentId: number) => void;
    isInvestorType: boolean;
}

const AdvisorAppointmentBox: React.FC<AdvisorAppointmentBox> = ({ appointment, service, requestAppointmentDeletion, isInvestorType }) => {


    return (<Card className="items-center">

        <div className=" items-center p-4 space-y-2">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">{formatDateToUTCString(appointment.start_time, "MMM d, yyyy")}</p>
                    {service && <h1 className="text-sm text-gray-500">{service.service_type_name}</h1>}
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{appointment.user_config.profile.first_name}</p>
                    {appointment.status === 'completed' && <div className="text-sm flex items-center text-gray-500">Is reviewed: {appointment.is_reviewed ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}</div>}

                </div>

            </div>
            <div className="flex space-x-2">
                <Button className="px-3 py-1 text-sm text-white bg-cyan-500 rounded-md"><Mail className="w-4 h-4 mr-1.5" />Chat</Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="hover:bg-red-500 hover:text-white"><CalendarX2 className="w-4 h-4 mr-1.5" />Cancel</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center"><CircleAlert className="w-6 h-6 mr-1.5" />Are you sure you want to cancel the appointment?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                appointment and notify the user.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Back</AlertDialogCancel>
                            <AlertDialogAction className="hover:bg-red-500 hover:text-white" onClick={() => requestAppointmentDeletion(appointment.appointment_id)}>Delete appointment</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {isInvestorType && <div>
                    {appointment.status === 'completed' && <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline"><Check className="w-4 h-4 mr-1.5" />Review</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Review the appointment</DialogTitle>
                                <DialogDescription>
                                    What did you like about the advisor?
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Rating
                                    </Label>
                                    <RatingStars rating={5} />
                                </div>


                                <Input
                                    placeholder="Write a review..."
                                    className="col-span-3"
                                />

                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>}



                </div>}
            </div>
        </div>


    </Card>);
}



export default AdvisorAppointmentBox;