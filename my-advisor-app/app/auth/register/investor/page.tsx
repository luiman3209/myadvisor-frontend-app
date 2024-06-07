"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getServiceTypes } from '@/services/serviceTypesService';
import { ProfileData, CommonProfileData, InvestorProfileData } from '@/types/auth';
import { ServiceType } from '@/types/entity/service_type_entity';

import { checkEmailAvailability, checkPhoneAvailability } from '@/services/authService';
import RegisterNavbar from '@/components/navbar/RegisterNavbar';
import { Button } from '@/components/ui/button';
import InvestorForm from '@/components/forms/InvestorForm';

export default function RegisterInvestor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [netWorth, setNetWorth] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [geoPreferences, setGeoPreferences] = useState('');
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<ServiceType[]>([]);
  const [formStep, setFormStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


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


  const validateStep = async () => {
    const newErrors: { [key: string]: string } = {};
    if (formStep === 0) {
      if (!email) newErrors.email = "Email is required";
      if (! await checkEmailAvailability(email)) newErrors.email = "Email is already taken";
      if (!password) newErrors.password = "Password is required";
      if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";
      if (password !== confirmPassword) newErrors.password = "Passwords do not match";
    } else if (formStep === 1) {
      if (!firstName) newErrors.firstName = "First Name is required";
      if (firstName.length < 2) newErrors.firstName = "First Name must be at least 2 characters long";
      if (!lastName) newErrors.lastName = "Last Name is required";
      if (lastName.length < 2) newErrors.lastName = "Last Name must be at least 2 characters long";
      if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
      if (phoneNumber.length < 10) newErrors.phoneNumber = "Phone Number must be at least 10 characters long";
      if (! await checkPhoneAvailability(phoneNumber)) newErrors.phoneNumber = "Phone Number is already taken";
      if (!address) newErrors.address = "Address is required";
    } else if (formStep === 2) {

      if (!selectedServiceTypes || selectedServiceTypes.length < 1) newErrors.expertise = "Expertise is required";
    } else if (formStep === 3) {
      if (!netWorth) newErrors.netWorth = "Net Worth is required";
      if (!incomeRange) newErrors.incomeRange = "Income Range is required";
      if (!geoPreferences) newErrors.geoPreferences = "Geographical Preferences is required";

    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    if (await validateStep()) {
      setFormStep(prevStep => prevStep + 1);
    }
  };

  const previousStep = () => {
    setFormStep(prevStep => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (! await validateStep()) {
      return;
    }

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
      selected_service_ids: selectedServiceTypes.map((type) => type.service_id),
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

    console.log('profileData', profileData);

    await register(email, password, profileData, false);
  };

  return (
    <main>

      <RegisterNavbar />
      <div className='flex items-center justify-center '>
        <div className="relative text-center py-20 px-5 w-full md:w-1/2 lg:w-1/4 space-y-8">
          <h1 className="text-3xl font-bold mb-5">Register as Investor</h1>
          <p>Will take just a minute</p>
          <div className="relative w-full">

            <InvestorForm
              formStep={formStep}
              errors={errors}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              address={address}
              setAddress={setAddress}
              netWorth={netWorth}
              setNetWorth={setNetWorth}
              incomeRange={incomeRange}
              setIncomeRange={setIncomeRange}
              geoPreferences={geoPreferences}
              setGeoPreferences={setGeoPreferences}
              selectedServiceTypes={selectedServiceTypes}
              setSelectedServiceTypes={setSelectedServiceTypes}
              availableServiceTypes={serviceTypes}

            />
          </div>
          <div className="flex justify-between mt-6">
            {formStep > 0 && <Button onClick={previousStep}>Back</Button>}
            {formStep < 3 && <Button onClick={nextStep} className="ml-auto bg-cyan-500">Next</Button>}
            {formStep === 3 && <Button onClick={handleSubmit} className="ml-auto bg-cyan-500">Submit</Button>}
          </div>
        </div>

      </div>

    </main>
  );
}


