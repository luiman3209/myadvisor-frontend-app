import React, { useState } from 'react';
import { ChevronRight, BadgeInfo, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ServiceType } from '@/types/entity/service_type_entity';
import { encodeQueryData } from '@/utils/commonUtils';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import { Button } from '../ui/button';

import {
  Drawer,
  DrawerClose,
  DrawerContent,

  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import TimePickerController from './TimePickerController';
import { formatDateToUTCString } from '@/utils/dateUtils';
import { useAuth } from '@/contexts/AuthContext';

interface BookAppointmentV2Props {
  advisorId: number;
  officeAddress: string;
  services: ServiceType[];
  initialDays: string[];
  initialAvailableTimes?: { [key: string]: string[] };
}

const BookAppointmentV2: React.FC<BookAppointmentV2Props> = ({ advisorId, officeAddress, services, initialDays, initialAvailableTimes }) => {

  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<{ [key: string]: string[] }>(initialAvailableTimes ?? {});
  const [days, setDays] = useState<string[]>(initialDays);

  const { user } = useAuth();

  const inputReady = selectedDay && selectedTime && selectedService;

  const handleTimeSlotClick = (day: string, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
  };



  const confirmBooking = async () => {
    if (inputReady) {
      try {
        setBookingError(null);

        const service = services.find((s) => s.service_type_name === selectedService);
        if (service) {
          const queryData = {
            advisorId,
            serviceId: service.service_id,
            day: selectedDay,
            time: selectedTime,
          };
          const encodedData = encodeQueryData(queryData);
          router.push(`/book?data=${encodedData}`);
        } else throw new Error('Service not found');
      } catch (error: any) {
        setBookingError(error.message);
      }
    }
  };

  const windowWidth = window.innerWidth;

  if (windowWidth < 768) {
    const firstDay = days[0];
    const availableTimes1stDay = availableTimes[firstDay];

    return (availableTimes1stDay && availableTimes1stDay.length > 0 ?

      <div className="md:hidden space-y-2">

        {(!user || user.role === 'investor') &&
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-full py-2 border border-gray-300 rounded flex items-center justify-between ">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className="border border-gray-300 rounded bg-white">
              <SelectGroup>
                {services.map((service) => (
                  <SelectItem key={service.service_id} value={service.service_type_name} className=" cursor-pointer hover:bg-gray-100">
                    {service.service_type_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>}
        <div className='font-semibold'>{formatDateToUTCString(new Date(firstDay), "MMM d")}</div>
        <div className='flex flex-row space-x-1 justify-center'>

          <Button
            className={`px-3 py-2 text-black ${selectedDay === firstDay && selectedTime === availableTimes1stDay[0] ?
              'bg-cyan-500 text-white' : 'bg-white hover:bg-cyan-500 hover:text-white'}`}
            onClick={() => handleTimeSlotClick(firstDay, availableTimes1stDay[0])}
          >
            {availableTimes1stDay[0]}
          </Button>

          <Button
            className={`px-3 py-2 text-black ${selectedDay === firstDay && selectedTime === availableTimes1stDay[1] ?
              'bg-cyan-500 text-white' : 'bg-white hover:bg-cyan-500 hover:text-white'}`}
            onClick={() => handleTimeSlotClick(firstDay, availableTimes1stDay[1])}
          >
            {availableTimes1stDay[1]}
          </Button>

          <Button
            className={`px-3 py-2 text-black ${selectedDay === firstDay && selectedTime === availableTimes1stDay[2] ?
              'bg-cyan-500 text-white' : 'bg-white hover:bg-cyan-500 hover:text-white'}`}
            onClick={() => handleTimeSlotClick(firstDay, availableTimes1stDay[2])}
          >
            {availableTimes1stDay[2]}
          </Button>

          <Button
            className={`px-3 py-2  text-black ${selectedDay === firstDay && selectedTime === availableTimes1stDay[3] ?
              'bg-cyan-500 text-white' : 'bg-white hover:bg-cyan-500 hover:text-white'}`}
            onClick={() => handleTimeSlotClick(firstDay, availableTimes1stDay[3])}
          >
            {availableTimes1stDay[3]}
          </Button>

          {(!user || user.role === 'investor') &&
            <Drawer>
              <DrawerTrigger className='bg-gray-200 p-1.5 rounded'>More</DrawerTrigger>
              <DrawerContent className='h-full'>
                <DrawerHeader>
                  <DrawerTitle>Select a service and a day</DrawerTitle>

                </DrawerHeader>

                <div className="m-6 flex">
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="w-full py-2 border border-gray-300 rounded flex items-center justify-between ">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray-300 rounded bg-white">
                      <SelectGroup>
                        {services.map((service) => (
                          <SelectItem key={service.service_id} value={service.service_type_name} className=" cursor-pointer hover:bg-gray-100">
                            {service.service_type_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <TimePickerController
                  initiallyExpanded={true}
                  advisorId={advisorId}
                  selectedDay={selectedDay}
                  selectedTime={selectedTime}
                  setSelectedDay={setSelectedDay}
                  setSelectedTime={setSelectedTime}
                  initialDays={days}
                  initialAvailableTimes={initialAvailableTimes}
                />

                <DrawerFooter>

                  <div className='flex items-center justify-center mt-2'>
                    <div className="w-min">
                      <Button className="  bg-cyan-500 hover:bg-cyan-400" disabled={!inputReady} onClick={confirmBooking}>
                        <div className='flex flex-row space-x-2'>
                          {inputReady ?
                            <>
                              <span>Confirm booking for {selectedService} on {formatDateToUTCString(new Date(selectedDay), "MMM, dd")} at {selectedTime}</span>
                              <ChevronRight className='w-5 h-5' />
                            </>
                            :
                            <><span>Select a service and time to proceed</span>
                              <Lock className='w-5 h-5' />
                            </>
                          }


                        </div>
                      </Button>
                      {bookingError && <div className="mt-2 text-red-500">{bookingError}</div>}
                    </div>
                  </div>

                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>}


        </div>


        <div className='flex items-center justify-center'>
          <div className="w-min">
            <Button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400" onClick={confirmBooking} disabled={!inputReady}>
              <div className='flex flex-row space-x-2'>
                {inputReady ?
                  <>
                    <span>Confirm booking for {selectedService} on {formatDateToUTCString(new Date(selectedDay), "MMM, dd")} at {selectedTime}</span>
                    <ChevronRight className='w-5 h-5' />
                  </>
                  :
                  <><span>Select a service and time to proceed</span>
                    <Lock className='w-5 h-5' />
                  </>
                }
              </div>
            </Button>
            {bookingError && <div className="mt-2 text-red-500">{bookingError}</div>}
          </div>
        </div>


      </div> : <div className=''>No available times</div>);
  }

  return (
    <div className="p-5 flex flex-col ">
      {(!user || user.role === 'investor') &&
        <div>
          <div className='flex items-center space-x-1 '> <BadgeInfo className='w-6 h-6 mr-1.5' /> <Label className='text-lg'>
            Select service and time
          </Label></div>

          <div className="my-5">
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-full py-2 border border-gray-300 rounded flex items-center justify-between ">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="border border-gray-300 rounded bg-white">
                <SelectGroup>
                  {services.map((service) => (
                    <SelectItem key={service.service_id} value={service.service_type_name} className=" cursor-pointer hover:bg-gray-100">
                      {service.service_type_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      }

      <TimePickerController
        advisorId={advisorId}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        setSelectedDay={setSelectedDay}
        setSelectedTime={setSelectedTime}
        initialDays={days}
        initialAvailableTimes={initialAvailableTimes}
      />



      <div className='flex items-center justify-center mt-2'>
        <div className="w-min">
          <Button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400" onClick={confirmBooking} disabled={!inputReady}>
            <div className='flex flex-row space-x-2'>
              {inputReady ?
                <>
                  <span>Confirm booking for {selectedService} on {formatDateToUTCString(new Date(selectedDay), "MMM, dd")} at {selectedTime}</span>
                  <ChevronRight className='w-5 h-5' />
                </>
                :
                <><span>Select a service and time to proceed</span>
                  <Lock className='w-5 h-5' />
                </>
              }
            </div>
          </Button>
          {bookingError && <div className="mt-2 text-red-500">{bookingError}</div>}
        </div>
      </div>

    </div>
  );
};

export default BookAppointmentV2;
