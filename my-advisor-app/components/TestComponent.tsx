// components/HomeClient.tsx
"use client";

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

interface HomeClientProps {
    serviceTypes: any[];
}

const HomeClient: React.FC<HomeClientProps> = ({ serviceTypes }) => {
    const [operatingCountryCode, setOperatingCountryCode] = useState('');
    const [selectedServiceTypeId, setSelectedServiceTypeId] = useState<string | undefined>(undefined);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = new URLSearchParams();
        if (operatingCountryCode) query.append('operating_country_code', operatingCountryCode);
        if (selectedServiceTypeId) query.append('service_id', selectedServiceTypeId.toString());
        router.push(`/advisor/explorer?${query.toString()}`);
    };

    return (
        <div className='flex flex-col min-h-screen bg-cyan-500'>
            <Navbar />
            <main className="flex-grow">
                <div className="p-12 bg-transparent relative">
                    <div className="flex flex-col items-center mb-12">
                        <div className='w-full'>
                            <img src="/images/subjects.png" alt="Subjects" className="w-full h-auto" />
                        </div>
                        <div className="absolute top-0 left-0 right-0 p-4 bg-transparent text-white">
                            <h1 className="text-3xl font-semibold mb-4">Book your appointment online!</h1>
                            <p className="mb-6 text-xl font-base">Search among thousands of Financial Advisors.</p>
                            <form onSubmit={handleSearch} className="mt-5">
                                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                                    <Input
                                        type="text"
                                        placeholder="Country Code"
                                        value={operatingCountryCode}
                                        onChange={(e) => setOperatingCountryCode(e.target.value)}
                                        className="text-black text-base"
                                    />
                                    <Select value={selectedServiceTypeId || ''} onValueChange={(e) => setSelectedServiceTypeId(e)}>
                                        <SelectTrigger className="w-full md:w-[180px] text-slate-600 text-base">
                                            <SelectValue placeholder="Service Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {serviceTypes.map((type) => (
                                                    <SelectItem className="text-base text-black" key={type.service_id} value={type.service_id}>
                                                        {type.service_type_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="p-2 mt-4 bg-white hover:bg-cyan text-black rounded">
                                    Search
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomeClient;
