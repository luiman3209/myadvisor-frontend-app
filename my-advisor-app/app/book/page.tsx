"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from '@/components/ui/card';
import { ServiceType } from '@/types/entity/service_type_entity';
import { AdvisorEntity } from '@/types/entity/advisor_entity';
import { getAdvisorBookInfo } from '@/services/advisorService';
import { getServiceTypeById } from '@/services/serviceTypesService';
import CircularProgress from '@/components/misc/CircularProgress';

import { AvatarFallback, Avatar, AvatarImage } from '@/components/ui/avatar';
import { bookAppointment } from '@/services/appointmentService';
import { decodeQueryData, encodeQueryData, encodeQueryDataString } from '@/utils/commonUtils';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, Loader } from 'lucide-react';
import { formatDateToUTCString } from '@/utils/dateUtils';


const ConfirmBook: React.FC = () => {
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [advisor, setAdvisor] = useState<AdvisorEntity | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [appointmentConfirmed, setAppointmentConfirmed] = useState<boolean>(false);
    const router = useRouter();
    const { user } = useAuth();


    useEffect(() => {



        const fetchBookingData = async () => {
            setLoading(true);
            setError(null);

            try {
                const queryParams = new URLSearchParams(window.location.search);
                const encodedData = queryParams.get('data') || '';
                const encodedRedirect = encodeQueryDataString('/book?data=' + encodedData);
                if (!user) {
                    router.push(`/auth/login?redirect=${encodedRedirect}`);
                    return;
                }
                const { advisorId, serviceId, day, time } = decodeQueryData(encodedData);

                const [fetchedAdvisor, fetchedService] = await Promise.all([
                    getAdvisorBookInfo(advisorId),
                    getServiceTypeById(serviceId)
                ]);

                setAdvisor(fetchedAdvisor);
                setSelectedService(fetchedService);
                setSelectedDay(day);
                setSelectedTime(time);
            } catch (err: any) {
                setError('Failed to fetch booking information');
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [router, user]);

    const handleConfirm = async () => {

        try {
            const startTime = `${selectedDay}T${selectedTime}:00Z`;
            const [hour, minute] = selectedTime.split(':').map(Number);
            let endHour = hour + 1;
            const endHourStr = endHour.toString().padStart(2, '0');
            const endTime = `${selectedDay}T${endHourStr}:${minute.toString().padStart(2, '0')}:00Z`;
            if (advisor && selectedService) {
                await bookAppointment(advisor.advisor_id, selectedService.service_id, startTime, endTime);
                setAppointmentConfirmed(true);
            }

        } catch (err) {
            console.error('Failed to book appointment:', err);
            setError('This advisor is not available at this time anymore. Please try another time.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <CircularProgress size={100} strokeWidth={10} initialProgress={0} interval={100} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                {error}.
            </div>
        );
    }

    if (!selectedService || !selectedDay || !selectedTime || !advisor) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">

                <Loader className="animate-spin w-8 h-8 text-cyan-600" />

            </div>
        );
    }

    return (
        <main className=''>
            <div className="flex flex-row w-full min-h-screen ">
                <div className="w-full xl:w-1/2 ">
                    <div className='p-4'>
                        <Link href="/">
                            <Image
                                src="/images/myadvisor-logo-black.svg"
                                alt="Logo"
                                width={70}
                                height={70}
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center justify-center h-3/4">


                        <Card className='p-8 border-cyan-500 hover:border-cyan-400'>
                            {!appointmentConfirmed ?
                                <div className="mx-auto w-[350px] space-y-6">
                                    <div className="text-center">
                                        <h1 className="text-3xl font-bold">Confirm Booking</h1>

                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Service</Label>
                                            <Card className='p-2 font-semibold'>{selectedService.service_type_name}</Card>
                                        </div>
                                        <div className='flex flex-row justify-start space-x-12'>
                                            <div className="space-y-2">
                                                <Label>Day</Label>
                                                <p className='font-semibold'>{formatDateToUTCString(new Date(selectedDay), "MMM d, yyyy")}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Time</Label>
                                                <p className='font-semibold'>{selectedTime}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Advisor</Label>
                                            <div className="flex items-center space-x-4">
                                                <Avatar ><AvatarImage src={advisor.img_url} alt={advisor.display_name} />
                                                    <AvatarFallback>CN</AvatarFallback> </Avatar>
                                                <p className='font-semibold'>{(advisor.display_name)}</p>
                                            </div>
                                        </div>
                                        <Button onClick={handleConfirm} className="w-full bg-cyan-500 hover:bg-cyan-400">
                                            Confirm Booking
                                        </Button>
                                    </div>
                                    <div className="text-center text-sm mt-4">
                                        <Link href={"/advisor/profile/?advisor=" + advisor.advisor_id} className="underline">
                                            Change time or day
                                        </Link>
                                    </div>
                                </div> : <div className="mx-auto w-[350px] space-y-6">
                                    <div className="text-center">
                                        <h1 className="text-3xl font-bold">Appointment confirmed!</h1>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Booked service</Label>
                                            <Card className='p-2 font-semibold'>{selectedService.service_type_name}</Card>
                                        </div>
                                        <div className='flex flex-row justify-start space-x-12'>
                                            <div className="space-y-2">
                                                <Label>Booked Day</Label>
                                                <p className='font-semibold'>{formatDateToUTCString(new Date(selectedDay), "MMM d, yyyy")}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Booked Time</Label>
                                                <p className='font-semibold'>{selectedTime}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Booked Advisor</Label>
                                            <div className="flex items-center space-x-4">
                                                <Avatar ><AvatarImage src={advisor.img_url} alt={advisor.display_name} />
                                                    <AvatarFallback>CN</AvatarFallback> </Avatar>
                                                <p className='font-semibold'>{(advisor.display_name)}</p>
                                            </div>
                                        </div>
                                        <Button onClick={() => router.push('/dashboard')} className="w-full bg-cyan-500 hover:bg-cyan-400">
                                            Go to your appointments <ChevronRight />
                                        </Button>
                                    </div>
                                    <div className="text-center text-sm mt-4">
                                        <Link href={"/advisor/profile/?advisor=" + advisor.advisor_id} className="underline">
                                            Back to Booking Page
                                        </Link>
                                    </div>
                                </div>}

                        </Card>

                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/2 bg-cyan-500">
                    <Image
                        src="/images/advisor_with_family.webp"
                        alt="Image"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>

        </main>
    );
};

export default ConfirmBook;
