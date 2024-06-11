import React, { useState, useEffect } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { bookAppointment, getFreeWindows } from '@/services/appointmentService';
import { ServiceType } from '@/types/entity/service_type_entity';
import { getNextDays } from '@/utils/commonUtils';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


interface BookAppointmentV2Props {
  advisorId: number;
  officeAddress: string;
  services: ServiceType[];
}

const BookAppointmentV2: React.FC<BookAppointmentV2Props> = ({ advisorId, officeAddress, services }) => {
  const { user, login, error: authError, loading: authLoading } = useAuth();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [selectedDay, setSelectedDay] = useState<string | null>();
  const [selectedTime, setSelectedTime] = useState<string | null>();
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginBox, setShowLoginBox] = useState<boolean>(false);
  const [availableTimes, setAvailableTimes] = useState<{ [key: string]: string[] }>({});
  const [days, setDays] = useState<string[]>(getNextDays(5));
  const [loadingTimes, setLoadingTimes] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    fetchAvailableTimes(days);
  }, []);

  const fetchAvailableTimes = async (newDays: string[]) => {
    setLoadingTimes(true);
    try {
      const startDate = newDays[0];
      const endDate = newDays[newDays.length - 1].concat('T23:59:59Z');
      const times = await getFreeWindows(advisorId, startDate, endDate);
      setAvailableTimes(times);
    } catch (error) {
      console.error('Failed to fetch available times:', error);
    }
    setLoadingTimes(false);
  };

  const updateDaysAndFetch = (dir: 'next' | 'prev' | 'none') => {
    const currentStartDate = new Date(days[0]);
    const newStartDate = new Date(currentStartDate);

    if (dir === 'none') {
      fetchAvailableTimes(days);
      return;
    }

    if (dir === 'next') {
      newStartDate.setDate(currentStartDate.getDate() + 5);
      setDirection('right');
    } else {
      newStartDate.setDate(currentStartDate.getDate() - 5);
      setDirection('left');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newStartDate < today) {
      newStartDate.setDate(today.getDate());
    }

    const newDays = getNextDays(5, newStartDate);
    setDays(newDays);
    fetchAvailableTimes(newDays);
  };

  const handleTimeSlotClick = (day: string, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
  };

  const confirmBooking = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (selectedDay && selectedTime) {
      try {
        setBookingError(null);
        const startTime = `${selectedDay}T${selectedTime}:00Z`;
        const [hour, minute] = selectedTime.split(':').map(Number);
        let endHour = hour + 1;
        const endHourStr = endHour.toString().padStart(2, '0');
        const endTime = `${selectedDay}T${endHourStr}:${minute.toString().padStart(2, '0')}:00Z`;

        const service = services.find((s) => s.service_type_name === selectedService);
        if (service) {
          await bookAppointment(advisorId, service?.service_id, startTime, endTime);
          setSelectedDay(null);
          setSelectedTime(null);
          alert('Appointment successfully booked on ' + new Date(selectedDay).toLocaleDateString() + ' at ' + selectedTime);
          updateDaysAndFetch('none');
        } else throw new Error('Service not found');

      } catch (error: any) {
        setBookingError(error.message);
      }
    }
  };

  const windowWidth = window.innerWidth;

  console.log(days, availableTimes)

  if (windowWidth < 768) {
    const firstDay = days[0];
    const availableTimes1stDay = availableTimes[firstDay];

    return (availableTimes1stDay && availableTimes1stDay.length > 0 && <div>
      <div>{firstDay}</div>
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

        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent className='h-full'>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>


      </div>

    </div>);
  }

  return (

    <div className="p-5 flex flex-col">
      <div className="mb-5">
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded flex items-center justify-between bg-white">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent className="border border-gray-300 rounded bg-white">
            <SelectGroup>
              {services.map((service) => (
                <SelectItem key={service.service_id} value={service.service_type_name} className="px-3 py-2 cursor-pointer hover:bg-gray-100">
                  {service.service_type_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center">
        <button
          className="p-2"
          onClick={() => updateDaysAndFetch('prev')}
          disabled={days[0] <= new Date().toISOString().split('T')[0]}
        >
          <ChevronLeftIcon />
        </button>
        <div className={!expanded ? "relative w-full min-h-[180px]" : "relative w-full min-h-[400px]"}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={days[0]}
              initial={{ x: direction === 'right' ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 'right' ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 right-0 flex gap-2 overflow-x-auto"
            >
              {days.map((day) => (
                <div key={day} className="flex flex-col items-center justify-center">
                  <span className="font-bold mb-2">{new Date(day).toLocaleDateString()}</span>
                  <div className={`flex flex-col gap-2 ${expanded ? 'overflow-visible' : 'overflow-hidden max-h-40'}`}>
                    {loadingTimes ? (
                      <div className="flex justify-center items-center h-full">
                        <Loader className="animate-spin" />
                      </div>
                    ) : availableTimes[day] ? availableTimes[day].slice(0, expanded ? undefined : 5).map((time) => (
                      <Button
                        key={day + time}
                        className={`px-3 py-2 border border-gray-300 text-black rounded ${selectedDay === day && selectedTime === time ? 'bg-cyan-500 text-white' : 'bg-white hover:bg-cyan-500 hover:text-white'}`}
                        onClick={() => handleTimeSlotClick(day, time)}
                      >
                        {time}
                      </Button>
                    )) : (
                      <span className="text-gray-500"> - </span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <button className="p-2" onClick={() => updateDaysAndFetch('next')}>
          <ChevronRightIcon />
        </button>
      </div>

      <button
        className="mt-2 px-4 py-2  rounded"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Show More'}
      </button>

      {selectedDay && selectedTime && (
        <div className="mt-5">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={confirmBooking}>
            Confirm booking
          </button>
          {bookingError && <div className="mt-2 text-red-500">{bookingError}</div>}
        </div>
      )}


    </div>
  );
};

export default BookAppointmentV2;
