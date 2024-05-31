import React, { useState, useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import './BookAppointmentStyles.css';

const offices = ['Office 1', 'Office 2', 'Office 3'];
const services = ['Service 1', 'Service 2', 'Service 3'];

const getNextDays = (days: number) => {
  const result = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    result.push(date.toISOString().split('T')[0]);
  }
  return result;
};

const availableTimes: { [key: string]: string[] } = {
  "2024-02-20": ["09:00", "09:30", "10:00"],
  "2024-02-21": ["11:00", "13:30"],
  "2024-02-22": ["09:00", "10:00", "11:00", "14:00"],
  "2024-02-23": ["09:00", "10:00", "11:00", "12:00"],
  "2024-02-24": ["13:00", "14:30", "15:00", "16:00"]
};

const BookAppointment: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState<string | undefined>();
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [days, setDays] = useState<string[]>(getNextDays(5));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleNextDays = () => {
    const lastDay = new Date(days[days.length - 1]);
    const newDays = [];
    for (let i = 1; i <= 5; i++) {
      const nextDay = new Date(lastDay);
      nextDay.setDate(lastDay.getDate() + i);
      newDays.push(nextDay.toISOString().split('T')[0]);
    }
    setDays(newDays);
  };

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
        <div className="time-picker-table">
          <div className="table-header">
            {days.map((day) => (
              <div key={day} className="table-cell">
                {new Date(day).toLocaleDateString()}
              </div>
            ))}
            <button className="next-button" onClick={handleNextDays}>
              <ChevronRightIcon />
            </button>
          </div>
          <div className="table-body">
            {days.map((day) => (
              <div key={day} className="table-row">
                {availableTimes[day] ? availableTimes[day].map((time) => (
                  <div key={day + time} className="table-cell">
                    <button
                      className={`time-slot-button ${selectedDay === day && selectedTime === time ? 'selected' : ''}`}
                      onClick={() => handleTimeSlotClick(day, time)}
                    >
                      {time}
                    </button>
                  </div>
                )) : (
                  <div className="table-cell">No slots</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
