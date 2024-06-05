"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServiceTypes } from '@/services/serviceTypesService';
import { ServiceType, ProfileData, CommonProfileData, AdvisorProfileData } from '@/types/auth';

import { Input } from '@/components/ui/input';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Slider from '@/components/Slider';

const allTimes = [
  '0000', '0030', '0100', '0130', '0200', '0230', '0300', '0330', '0400', '0430', '0500', '0530', '0600', '0630', '0700', '0730', '0800', '0830', '0900', '0930', '1000', '1030', '1100', '1130',
  '1200', '1230', '1300', '1330', '1400', '1430', '1500', '1530', '1600', '1630', '1700', '1730', '1800', '1830', '1900', '1930', '2000', '2030', '2100', '2130', '2200', '2230', '2300', '2330'
];

const calculateEndTimes = (start: string) => {
  const startIndex = allTimes.indexOf(start);
  if (startIndex === -1) return [];
  const maxEndIndex = Math.min(startIndex + 16, allTimes.length); // 16 half-hour increments = 8 hours
  return allTimes.slice(startIndex + 1, maxEndIndex + 1);
};

export default function RegisterAdvisor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [expertise, setExpertise] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [startShift1, setStartShift1] = useState('');
  const [endShift1, setEndShift1] = useState('');
  const [startShift2, setStartShift2] = useState('');
  const [endShift2, setEndShift2] = useState('');
  const [operatingCountryCode, setOperatingCountryCode] = useState('');
  const [operatingCityCode, setOperatingCityCode] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<number[]>([]);
  const [endShift1Options, setEndShift1Options] = useState<string[]>(allTimes);
  const [endShift2Options, setEndShift2Options] = useState<string[]>(allTimes);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const { user, register, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }

    // Fetch service types
    const fetchServiceTypes = async () => {
      try {
        const types = await getServiceTypes();
        setServiceTypes(types);
      } catch (error) {
        console.error('Failed to fetch service types', error);
      }
    };

    fetchServiceTypes();
  }, [user, router]);

  useEffect(() => {
    setEndShift1Options(calculateEndTimes(startShift1));
    setEndShift1(''); // Reset end shift when start shift changes
  }, [startShift1]);

  useEffect(() => {
    setEndShift2Options(calculateEndTimes(startShift2));
    setEndShift2(''); // Reset end shift when start shift changes
  }, [startShift2]);

  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.options);
    const selected: number[] = [];
    options.forEach(option => {
      if (option.selected) {
        selected.push(Number(option.value));
      }
    });
    setSelectedServiceTypes(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const commonData: CommonProfileData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address,
    };

    const advisorData: AdvisorProfileData = {
      qualifications,
      expertise,
      contact_information: contactInformation,
      start_shift_1: startShift1,
      end_shift_1: endShift1,
      start_shift_2: startShift2.length > 0 ? startShift2 : null,
      end_shift_2: endShift2.length > 0 ? endShift2 : null,
      operating_country_code: operatingCountryCode,
      operating_city_code: operatingCityCode,
      office_address: officeAddress,
      serviceTypes: serviceTypes.filter(service => selectedServiceTypes.includes(service.service_id)),
    };

    const profileData: ProfileData = {
      common_data: commonData,
      advisor_data: advisorData,
    };

    await register(email, password, profileData, true);
  };

  const countryCodes = ['US', 'CA', 'GB', 'AU', 'IN']; // Limited list of country codes

  return (
    <main>
      <div className="flex justify-between p-5 bg-cyan-500">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/myadvisor-logo.png"
              alt="Picture of the author"
              width={50}
              height={50}
              className="flex-shrink-0"
            />
            <span className="text-2xl font-medium text-white">MyAdvisor</span>
          </div>
        </Link>
        <div className="flex items-center">
          <span className="mr-3 text-white">Already registered?</span>
          <Button className='bg-cyan-600'>Login</Button>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <div className="relative text-center py-20 px-5 w-full md:w-1/2 space-y-8">
          <h1 className="text-3xl font-bold mb-5">Register as Advisor</h1>
          <p>Will take just a minute</p>
          <div className="relative w-full">
            {!isSliderOpen && (
              <div className="flex flex-col items-center space-y-6">
                <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <Input type="password" placeholder="Confirm password" />
                <Button variant="outline" size="icon" onClick={() => setIsSliderOpen(true)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Slider isOpen={isSliderOpen}>
              <div className="flex flex-col items-center space-y-6">
                <div className="flex justify-end w-full">
                  <Button variant="outline" size="icon" onClick={() => setIsSliderOpen(false)}>
                    Close
                  </Button>
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="space-y-4">
                    <Input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <Input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <Input type="text" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    <Input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
                    <Input type="text" placeholder="Qualifications" value={qualifications} onChange={e => setQualifications(e.target.value)} />
                    <Input type="text" placeholder="Expertise" value={expertise} onChange={e => setExpertise(e.target.value)} />
                    <Input type="text" placeholder="Contact Information" value={contactInformation} onChange={e => setContactInformation(e.target.value)} />
                    <select value={startShift1} onChange={e => setStartShift1(e.target.value)}>
                      {allTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <select value={endShift1} onChange={e => setEndShift1(e.target.value)}>
                      {endShift1Options.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <select value={startShift2} onChange={e => setStartShift2(e.target.value)}>
                      {allTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <select value={endShift2} onChange={e => setEndShift2(e.target.value)}>
                      {endShift2Options.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <select value={operatingCountryCode} onChange={e => setOperatingCountryCode(e.target.value)}>
                      {countryCodes.map(code => (
                        <option key={code} value={code}>{code}</option>
                      ))}
                    </select>
                    <Input type="text" placeholder="Operating City Code" value={operatingCityCode} onChange={e => setOperatingCityCode(e.target.value)} />
                    <Input type="text" placeholder="Office Address" value={officeAddress} onChange={e => setOfficeAddress(e.target.value)} />

                  </div>
                  <Button type="submit" className="mt-4">Register</Button>
                </form>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </main>
  );
}
