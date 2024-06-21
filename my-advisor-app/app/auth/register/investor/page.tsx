"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProfileData, CommonProfileData, InvestorProfileData } from '@/types/auth';
import { ServiceType } from '@/types/entity/service_type_entity';
import { checkEmailAvailability, checkPhoneAvailability } from '@/services/authService';
import RegisterNavbar from '@/components/navbar/RegisterNavbar';
import InvestorForm from '@/components/forms/InvestorForm';
import { decodeQueryDataString } from '@/utils/commonUtils';
import { useServiceContext } from '@/contexts/ServicesContext';
import { Card } from '@/components/ui/card';
import RegisterFormNavigator from '@/components/input/RegisterFormNavigator';

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
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<ServiceType[]>([]);
  const [formStep, setFormStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [redirect, setRedirect] = useState('');
  const { user, register, error } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { availableServices } = useServiceContext();

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const encodedRedirect = queryParams.get('redirect') || '';
    try {
      if (encodedRedirect) {
        const decodedRedirect = decodeQueryDataString(encodedRedirect);
        setRedirect(decodedRedirect);
      }
    } catch (err) {
      console.error('Failed to decode redirect query string', err);
    }


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
      if (!/^\d+$/.test(phoneNumber)) newErrors.phoneNumber = "Phone Number must contain only digits";
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

  const handleSubmit = async () => {

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



    await register(email, password, profileData, false);

    if (redirect) {
      router.push(redirect);
    } else {
      router.push('/');
    }
  };

  return (
    <main className='bg-gray-100 min-h-screen'>

      <RegisterNavbar />
      <Card className='md:my-8 mx-auto md:w-1/2 '>
        <div className='flex items-center justify-center '>
          <div className="relative text-center py-10 w-full md:w-1/2 space-y-8">
            <h1 className="text-3xl font-bold mb-5">Register as Investor</h1>
            <p>Will take just a minute</p>
            <div className="sm:px-8 md:px-0 mx-4">

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
                availableServiceTypes={availableServices}

              />
            </div>
            <RegisterFormNavigator
              formStep={formStep}
              nextStep={nextStep}
              previousStep={previousStep}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>


      </Card>

    </main>
  );
}


