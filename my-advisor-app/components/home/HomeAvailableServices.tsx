
import React from 'react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';


import { ServiceType } from '@/types/entity/service_type_entity';
import { Button } from '../ui/button';


interface HomeAvailableServicesProps {
    serviceTypes: ServiceType[];
}



const HomeAvailableServices: React.FC<HomeAvailableServicesProps> = ({ serviceTypes }) => {
    return (
        <div className="flex flex-col lg:px-72 bg-white">
            <CardHeader>
                <CardTitle>Available services by certified advisors</CardTitle>
                <CardDescription>Pick the service based on your needs.</CardDescription>
            </CardHeader>
            <CardContent className=' space-x-1 md:space-x-2 space-y-2'>
                {serviceTypes.map((type) => (
                    <Button variant="outline" key={'button'.concat(type.service_id.toString())}>
                        {type.service_type_name}
                    </Button>
                ))}
            </CardContent>
        </div>
    );
};

export default HomeAvailableServices;
