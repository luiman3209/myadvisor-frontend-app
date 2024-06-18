// contexts/ServiceContext.tsx
"use client";

import { getServiceTypes } from '@/services/serviceTypesService';
import { ServiceType } from '@/types/entity/service_type_entity';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


type ServiceContextType = {
    availableServices: ServiceType[];
    setAvailableServices: React.Dispatch<React.SetStateAction<ServiceType[]>>;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServiceContext = (): ServiceContextType => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useServiceContext must be used within a ServiceProvider');
    }
    return context;
};

type ServiceProviderProps = {
    children: ReactNode;
};

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
    const [availableServices, setAvailableServices] = useState<ServiceType[]>([]);

    useEffect(() => {

        const fetchServiceTypes = async () => {

            const services = await getServiceTypes();
            setAvailableServices(services);
        };

        fetchServiceTypes();
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <ServiceContext.Provider value={{ availableServices, setAvailableServices }}>
            {children}
        </ServiceContext.Provider>
    );
};
