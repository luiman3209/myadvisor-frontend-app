import React, { useState, useCallback } from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import './BookAppointmentStyles.css';

interface BookAppointmentProps {
  advisorId: number;
  offices: string[];
  services: string[];
  days: string[];
  availableTimes: { [key: string]: string[] };
  onNavigateDays: (direction: 'next' | 'prev') => void;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({
  advisorId,
  offices,
  services,
  days,
  availableTimes,
  onNavigateDays
}) => {
  const [selectedOffice, setSelectedOffice] = useState<string | undefined>();
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeSlotClick = (day: string, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
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
    </div>
  );
};

export default BookAppointment;
