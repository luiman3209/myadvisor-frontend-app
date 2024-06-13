// contexts/AppointmentContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppointmentContextType {
    appointmentData: {
        advisorId: number | null;
        serviceId: number | null;
        day: string | null;
        time: string | null;
    };
    setAppointmentData: (data: {
        advisorId: number | null;
        serviceId: number | null;
        day: string | null;
        time: string | null;
    }) => void;
}

interface AppointmentProviderProps {
    children: ReactNode;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
    const [appointmentData, setAppointmentData] = useState<{
        advisorId: number | null;
        serviceId: number | null;
        day: string | null;
        time: string | null;
    }>({
        advisorId: null,
        serviceId: null,
        day: null,
        time: null,
    });

    const value = {
        appointmentData,
        setAppointmentData,
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointment = () => {
    const context = useContext(AppointmentContext);
    if (context === undefined) {
        throw new Error('useAppointment must be used within an AppointmentProvider');
    }
    return context;
};
