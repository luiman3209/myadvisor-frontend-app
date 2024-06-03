"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getServiceTypes } from '@/services/serviceTypesService';
import { ServiceType, ProfileData, CommonProfileData, InvestorProfileData } from '@/types/auth';

export default function RegisterInvestor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [netWorth, setNetWorth] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [geoPreferences, setGeoPreferences] = useState('');
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<number[]>([]);

  const { user, register, error } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (user) {
      const advisorId = searchParams.get('advisorId');
      const selectedOffice = searchParams.get('selectedOffice');
      const selectedService = searchParams.get('selectedService');
      const selectedDay = searchParams.get('selectedDay');
      const selectedTime = searchParams.get('selectedTime');

      if (advisorId && selectedOffice && selectedService && selectedDay && selectedTime) {
        const query = new URLSearchParams({
          advisorId,
          selectedOffice,
          selectedService,
          selectedDay,
          selectedTime
        }).toString();
        router.push(`/advisor/profile?${query}`);
      } else {
        router.push('/');
      }
    }

    const fetchServiceTypes = async () => {
      try {
        const types = await getServiceTypes();
        setServiceTypes(types);
      } catch (error) {
        console.error('Failed to fetch service types', error);
      }
    };

    fetchServiceTypes();
  }, [user, router, searchParams]);

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

    const investorData: InvestorProfileData = {
      net_worth: netWorth,
      income_range: incomeRange,
      geo_preferences: geoPreferences,
      serviceTypes: serviceTypes.filter(service => selectedServiceTypes.includes(service.service_id)),
    };

    const profileData: ProfileData = {
      common_data: commonData,
      investor_data: investorData,
    };

    const query = new URLSearchParams({
      advisorId: searchParams.get('advisorId') || '',
      selectedOffice: searchParams.get('selectedOffice') || '',
      selectedService: searchParams.get('selectedService') || '',
      selectedDay: searchParams.get('selectedDay') || '',
      selectedTime: searchParams.get('selectedTime') || ''
    }).toString();

    await register(email, password, profileData, false);
  };

  return (
    <div>
      <h1>Register as Investor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Net Worth"
          value={netWorth}
          onChange={(e) => setNetWorth(e.target.value)}
        />
        <input
          type="text"
          placeholder="Income Range"
          value={incomeRange}
          onChange={(e) => setIncomeRange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Geographical Preferences"
          value={geoPreferences}
          onChange={(e) => setGeoPreferences(e.target.value)}
        />
        <select multiple onChange={handleServiceTypeChange}>
          {serviceTypes.map((type) => (
            <option key={type.service_id} value={type.service_id}>
              {type.service_type_name}
            </option>
          ))}
        </select>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
