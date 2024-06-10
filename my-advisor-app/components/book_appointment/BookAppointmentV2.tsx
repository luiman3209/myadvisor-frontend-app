import React, { useState, useEffect } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { bookAppointment, getFreeWindows } from '@/services/appointmentService';
import { ServiceType } from '@/types/entity/service_type_entity';
import { getNextDays } from '@/utils/commonUtils';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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

  const updateDaysAndFetch = (direction: 'next' | 'prev' | 'none') => {
    const currentStartDate = new Date(days[0]);
    const newStartDate = new Date(currentStartDate);

    if (direction === 'none') {
      fetchAvailableTimes(days);
      return;
    }

    if (direction === 'next') {
      newStartDate.setDate(currentStartDate.getDate() + 5);
    } else {
      newStartDate.setDate(currentStartDate.getDate() - 5);
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
      setShowLoginBox(true);
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

  const handleLogin = async () => {
    const query = new URLSearchParams({
      advisorId: advisorId.toString(),
      selectedOffice: officeAddress || '',
      selectedService: selectedService || '',
      selectedDay: selectedDay || '',
      selectedTime: selectedTime || ''
    }).toString();
    await login(email, password, `/advisor/profile?${query}`);
    setShowLoginBox(false);
    confirmBooking();
  };

  const handleRegisterRedirect = () => {
    const query = new URLSearchParams({
      advisorId: advisorId.toString(),
      selectedOffice: officeAddress || '',
      selectedService: selectedService || '',
      selectedDay: selectedDay || '',
      selectedTime: selectedTime || ''
    }).toString();
    router.push(`/auth/register/investor?${query}`);
  };

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

      <div className="">
        <div className="flex items-center">
          <button
            className="p-2"
            onClick={() => updateDaysAndFetch('prev')}
            disabled={days[0] <= new Date().toISOString().split('T')[0]}
          >
            <ChevronLeftIcon />
          </button>
          <div className="flex gap-2 overflow-x-auto">
            {days.map((day) => (
              <div key={day} className="flex flex-col items-center justify-items-center">
                <span className="font-bold">{new Date(day).toLocaleDateString()}</span>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-40 min-h-40 border border-gray-300 p-2 custom-scrollbar">
                  {loadingTimes ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader className="animate-spin" />
                    </div>
                  ) : availableTimes[day] ? availableTimes[day].map((time) => (
                    <button
                      key={day + time}
                      className={`px-3 py-2 border border-gray-300 rounded ${selectedDay === day && selectedTime === time ? 'bg-blue-500 text-white' : 'bg-white'}`}
                      onClick={() => handleTimeSlotClick(day, time)}
                    >
                      {time}
                    </button>
                  )) : (
                    <span className="text-gray-500">No slots available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="p-2" onClick={() => updateDaysAndFetch('next')}>
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {selectedDay && selectedTime && (
        <div className="mt-5">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={confirmBooking}>
            Confirm booking
          </button>
          {bookingError && <div className="mt-2 text-red-500">{bookingError}</div>}
        </div>
      )}

      {showLoginBox && (
        <div className="mt-5 p-5 border border-gray-300 rounded-lg bg-gray-100">
          <h3 className="mb-3">Login</h3>
          {authError && <p className="mb-3 text-red-500">{authError}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={authLoading}
            className="w-full p-3 mb-3 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={authLoading}
            className="w-full p-3 mb-3 border border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            disabled={authLoading}
            className="w-full p-3 bg-blue-500 text-white rounded mb-3"
          >
            {authLoading ? 'Logging in...' : 'Login'}
          </button>
          <p>
            Don&apos;t have an account? <span onClick={handleRegisterRedirect} className="cursor-pointer text-blue-500">Register</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentV2;
