
import React from 'react';

import Image from 'next/image';


import { ServiceType } from '@/types/entity/service_type_entity';
import { Button } from '../ui/button';
import { CountryPicker } from '../input/CountryPicker';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useRouter } from 'next/navigation';



interface HomeSearchAreaProps {
    serviceTypes: ServiceType[];


}



const HomeSearchArea: React.FC<HomeSearchAreaProps> = ({ serviceTypes }) => {

    const [selectedServiceName, setSelectedServiceName] = React.useState<string | undefined>(undefined);
    const [operatingCountryCode, setOperatingCountryCode] = React.useState<string | undefined>(undefined);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = new URLSearchParams();
        if (operatingCountryCode) query.append('country_code', operatingCountryCode);

        // find the service_id by selected service_name
        if (selectedServiceName) {
            serviceTypes.forEach((type) => {
                if (type.service_type_name === selectedServiceName) {
                    query.append('service_id', type.service_id.toString());
                }
            });
        }

        router.push(`/advisor/explorer?${query.toString()}`);
    };

    return (
        <div className="p-12 bg-cyan-500 relative  ">
            <div className="flex flex-col items-center lg:mb-24  ">
                <div className='w-full md:w-8/12 lg:w-1/4 md:ml-96 mt-72 md:mt-48 lg:mt-0'>
                    <Image
                        src="/images/subjects.png"
                        alt="Subjects"
                        className="w-full h-auto"
                    />

                </div>
                <div className="absolute top-0 left-0  p-4 bg-transparent  px-12 md:px-36 lg:px-[400px] py-6 lg:py-[150px] lg:w-[1500px] ">
                    <h1 className="text-3xl font-semibold mb-4 text-white">Book your appointment online!</h1>
                    <p className="mb-6 text-xl font-base text-white">Search among thousands of Financial Advisors.</p>
                    <form onSubmit={handleSearch} className="mt-5">
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <CountryPicker countryCode={operatingCountryCode} setCountryCode={setOperatingCountryCode} />
                            <Select value={selectedServiceName || ''} onValueChange={(e) => setSelectedServiceName(e)}>
                                <SelectTrigger className="md:w-5/12 text-slate-600 text-base font-medium " >
                                    <SelectValue className="" placeholder="Service Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {serviceTypes.map((type) => (
                                            <SelectItem className="text-base text-black" key={type.service_id} value={type.service_type_name}>
                                                {type.service_type_name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Button
                                disabled={!selectedServiceName && !operatingCountryCode}
                                className="md:w-2/12 p-2 mt-4 bg-cyan-200 hover:bg-cyan-100 text-black text-base font-semibold rounded">
                                Search
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomeSearchArea;
