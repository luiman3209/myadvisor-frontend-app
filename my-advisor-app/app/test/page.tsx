"use client";
import React, { useState } from 'react';

const AppointmentPicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const dates = ['2024-06-10', '2024-06-11', '2024-06-12'];
    const times = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-xl font-bold">Book an Appointment</h1>
            <div>
                <h2 className="text-lg">Select a Date:</h2>
                <div className="flex space-x-2">
                    {dates.map(date => (
                        <button
                            key={date}
                            onClick={() => setSelectedDate}
                            className={`py-2 px-4 rounded ${selectedDate === date ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {date}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-lg">Select a Time:</h2>
                <div className="flex space-x-2">
                    {times.map(time => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime}
                            className={`py-2 px-4 rounded ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>
            {selectedDate && selectedTime && (
                <div>
                    <h2 className="text-lg">Summary:</h2>
                    <p>Date: {selectedDate}</p>
                    <p>Time: {selectedTime}</p>
                </div>
            )}
        </div>
    );
};

export default AppointmentPicker;
