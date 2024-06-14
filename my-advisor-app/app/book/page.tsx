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

export default function ConfirmBook() {
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [advisor, setAdvisor] = useState<AdvisorEntity | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const decodeQueryData = (encodedData: string) => {
        const decodedStr = atob(encodedData);
        return JSON.parse(decodedStr);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const encodedData = queryParams.get('data') || '';
        const { advisorId, serviceId, day, time } = decodeQueryData(encodedData);
        console.log('Decoded data:', { advisorId, serviceId, day, time });



        async function fetchAdvisor() {
            try {
                const fetchedAdvisor: AdvisorEntity = await getAdvisorBookInfo(advisorId);
                setAdvisor(fetchedAdvisor);
            } catch (error) {
                console.error('Error fetching advisor:', error);
            } finally {
                setLoading(false);
            }
        }



        if (advisorId) {
            setSelectedDay(day);
            setSelectedTime(time);
            fetchAdvisor();
            console.log(selectedDay, selectedTime, advisor?.display_name, selectedService?.service_type_name);
        }
    }, []);

    const handleConfirm = () => {
        // Handle the booking confirmation logic here

    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!selectedService || !selectedDay || !selectedTime || !advisor) {
        return <div>Missing booking information. {selectedDay + selectedService + selectedTime + advisor?.display_name}</div>;
    }

    return (
        <main className=''>
            <div className="absolute top-0 left-0 p-4">
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

            <div className="flex flex-col lg:flex-row lg:min-h-[600px] xl:min-h-[800px] w-full ">
                <div className="flex items-center justify-center lg:w-1/2 py-12">
                    <Card className='p-8'>
                        <div className="mx-auto w-[350px] space-y-6">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold">Confirm Booking</h1>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Service</Label>
                                    <p>{selectedService?.service_type_name}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Day</Label>
                                    <p>{selectedDay}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Time</Label>
                                    <p>{selectedTime}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Advisor</Label>
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src={advisor.img_url}
                                            alt={advisor.display_name}
                                            width={50}
                                            height={50}
                                            className="object-cover rounded-full"
                                        />
                                        <p>{advisor.display_name}</p>
                                    </div>
                                </div>
                                <Button onClick={handleConfirm} className="w-full">
                                    Confirm Booking
                                </Button>
                            </div>
                            <div className="text-center text-sm mt-4">
                                <Link href="/services" className="underline">
                                    Back to Services
                                </Link>
                            </div>
                        </div>
                    </Card>
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
}
