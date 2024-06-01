import React, { useState, useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import './BookAppointmentStyles.css';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { bookAppointment } from '@/services/appointmentService';

interface BookAppointmentProps {
  advisorId: number;
  offices: string[];
  services: string[];
  days: string[];
  availableTimes: { [key: string]: string[] };
  onNavigateDays: (direction: 'next' | 'prev') => void;
  selectedOffice?: string;
  selectedService?: string;
  selectedDay?: string;
  selectedTime?: string;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({
  advisorId,
  offices,
  services,
  days,
  availableTimes,
  onNavigateDays,
  selectedOffice: initialSelectedOffice,
  selectedService: initialSelectedService,
  selectedDay: initialSelectedDay,
  selectedTime: initialSelectedTime,
}) => {
  const { user, login, error: authError, loading: authLoading } = useAuth();
  const router = useRouter();
  const [selectedOffice, setSelectedOffice] = useState<string | undefined>(initialSelectedOffice);
  const [selectedService, setSelectedService] = useState<string | undefined>(initialSelectedService);
  const [selectedDay, setSelectedDay] = useState<string | null>(initialSelectedDay || null);
  const [selectedTime, setSelectedTime] = useState<string | null>(initialSelectedTime || null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginBox, setShowLoginBox] = useState<boolean>(false);

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
        const startTime = `${selectedDay}T${selectedTime}:00`;
        const endTime = `${selectedDay}T${parseInt(selectedTime.split(':')[0]) + 1}:00`;
        await bookAppointment(advisorId, startTime, endTime);
        alert('Appointment successfully booked');
      } catch (error: any) {
        setBookingError(error.message);
      }
    }
  };

  const handleLogin = async () => {
    const query = new URLSearchParams({
      advisorId: advisorId.toString(),
      selectedOffice: selectedOffice || '',
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
      selectedOffice: selectedOffice || '',
      selectedService: selectedService || '',
      selectedDay: selectedDay || '',
      selectedTime: selectedTime || ''
    }).toString();
    router.push(`/auth/register/investor?${query}`);
  };

  return (
    <div className="book-appointment-panel">
      <h2 className="panel-title">Book an appointment</h2>

      <div className="form-field">
        <label>Select an office</label>
        <Select.Root value={selectedOffice} onValueChange={setSelectedOffice}>
          <Select.Trigger className="select-trigger">
            <Select.Value placeholder="Select an office" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content className="select-content">
            <Select.Viewport>
              {offices.map((office) => (
                <Select.Item key={office} value={office} className="select-item">
                  <Select.ItemText>{office}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>

      <div className="form-field">
        <label>Service type</label>
        <Select.Root value={selectedService} onValueChange={setSelectedService}>
          <Select.Trigger className="select-trigger">
            <Select.Value placeholder="Select a service" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content className="select-content">
            <Select.Viewport>
              {services.map((service) => (
                <Select.Item key={service} value={service} className="select-item">
                  <Select.ItemText>{service}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>

      <div className="form-field">
        <label>Appointment date</label>
        <div className="time-picker-list">
          <div className="list-navigation">
            <button className="prev-button" onClick={() => onNavigateDays('prev')}>
              <ChevronLeftIcon />
            </button>
            <div className="days-list">
              {days.map((day) => (
                <div key={day} className="time-picker-day">
                  <span className="day-label">{new Date(day).toLocaleDateString()}</span>
                  <div className="time-buttons">
                    {availableTimes[day] ? availableTimes[day].map((time) => (
                      <button
                        key={day + time}
                        className={`time-slot-button ${selectedDay === day && selectedTime === time ? 'selected' : ''}`}
                        onClick={() => handleTimeSlotClick(day, time)}
                      >
                        {time}
                      </button>
                    )) : (
                      <span className="no-slots">No slots</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="next-button" onClick={() => onNavigateDays('next')}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>

      {selectedDay && selectedTime && (
        <div className="confirm-booking">
          <button className="confirm-button" onClick={confirmBooking}>
            Confirm book
          </button>
          {bookingError && <div className="error-message">{bookingError}</div>}
        </div>
      )}

      {showLoginBox && (
        <div className="login-box">
          <h3>Login</h3>
          {authError && <p className="error-message">{authError}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={authLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={authLoading}
          />
          <button onClick={handleLogin} disabled={authLoading}>
            {authLoading ? 'Logging in...' : 'Login'}
          </button>
          <p>
            Don&apos;t have an account? <a onClick={handleRegisterRedirect} style={{ cursor: 'pointer', color: 'blue' }}>Register</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
