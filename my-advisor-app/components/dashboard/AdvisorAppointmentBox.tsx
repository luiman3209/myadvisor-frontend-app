import { AppointmentDto } from "@/types/types";
import { formatDateToUTCString } from "@/utils/dateUtils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CalendarX2, Check, CircleAlert, Lock, Star, X } from "lucide-react";

import { ServiceType } from "@/types/entity/service_type_entity";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import RatingStars from "../misc/RatingStars";
import { ChangeEvent, useState } from "react";
import Link from "next/link";


interface AdvisorAppointmentBox {
    appointment: AppointmentDto;
    service: ServiceType | undefined;
    requestAppointmentDeletion: (appointmentId: number) => void;
    reviewAppontment: (appointmentId: number, rating: number, review: string) => void;
    isInvestorType: boolean;
}

const AdvisorAppointmentBox: React.FC<AdvisorAppointmentBox> = ({ appointment, service, requestAppointmentDeletion, isInvestorType, reviewAppontment }) => {


    const [reviewText, setReviewText] = useState<string>('');
    const [ratingValue, setRatingValue] = useState<number>(0);
    const [open, setOpen] = useState(false);

    const handleReviewSubmission = () => {
        setOpen(false);
        reviewAppontment(appointment.appointment_id, ratingValue, reviewText);

    }

    return (<Card className="items-center">

        <div className=" items-center p-4 space-y-2">
            <div className="space-y-2 mb-8">
                <div className="flex items-center justify-between ">
                    <p className="text-lg font-semibold">{formatDateToUTCString(appointment.start_time, "k:mm MMM d, yyyy")}</p>
                    {service && <h1 className="text-sm text-gray-500">{service.service_type_name}</h1>}
                </div>

                <div className="flex items-center justify-between">

                    {
                        isInvestorType ?
                            <Link className="text-sm text-gray-500 hover:underline" href={"/advisor/profile?advisor=" + appointment.advisor.advisor_id}>
                                {appointment.advisor.display_name}</Link> :
                            <p className="text-sm text-gray-500">{appointment.user_config.profile.first_name}</p>}


                    {!isInvestorType && appointment.status === 'completed' &&
                        <div className="text-sm flex items-center text-gray-500">
                            {appointment.is_reviewed ? <div className="flex"> <span>Reviewed</span><Check className="ml-1.5 w-4 h-4" /> </div>
                                : <div className="flex"> <span>Not reviewed</span><X className="ml-1.5 w-4 h-4" /> </div>}
                        </div>}

                </div>

            </div>
            <div className="flex space-x-2 flex-wrap ">
                <Button className="px-3 py-1 text-sm text-white bg-cyan-500 rounded-md" disabled={true}><Lock className="w-4 h-4 mr-1.5" />Chat</Button>
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
                    {appointment.status === 'completed' && !appointment.is_reviewed &&
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline"><Star className="w-4 h-4 mr-1.5" />Review</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Review the appointment</DialogTitle>
                                    <DialogDescription>
                                        What did you like about the advisor?
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="">
                                        <Label htmlFor="name" className="text-right">
                                            Rate it!
                                        </Label>
                                        <RatingStars initialRating={ratingValue ?? 0} isInput={true} setRating={setRatingValue} />
                                    </div>


                                    <Input
                                        placeholder="Write a review..."
                                        className="col-span-3"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setReviewText(e.target.value)}
                                    />

                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="bg-cyan-500 hover:bg-cyan-400" onClick={() => handleReviewSubmission()}>Save review</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>}


                </div>}
            </div>
        </div>


    </Card>);
}



export default AdvisorAppointmentBox;