"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getServiceTypes } from '@/services/serviceTypesService';
import { ProfileData, CommonProfileData, AdvisorProfileData } from '@/types/auth';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';


import { getAvailableQualifications } from '@/services/qualificationService';
import { QualificationEntity } from '@/types/entity/qualification_entity';
import { ServiceType } from '@/types/entity/service_type_entity';
import { checkEmailAvailability, checkPhoneAvailability } from '@/services/authService';
import RegisterNavbar from '@/components/navbar/RegisterNavbar';
import AdvisorForm from '@/components/forms/AdvisorForm';



export default function RegisterAdvisor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedQualifications, setSelectedQualifications] = useState<QualificationEntity[]>([]);
  const [availableQualifications, setAvailableQualifications] = useState<QualificationEntity[]>([]);
  const [contactInformation, setContactInformation] = useState('');
  const [startShift1, setStartShift1] = useState('');
  const [endShift1, setEndShift1] = useState('');
  const [startShift2, setStartShift2] = useState('');
  const [endShift2, setEndShift2] = useState('');
  const [operatingCountryCode, setOperatingCountryCode] = useState('');
  const [operatingCityCode, setOperatingCityCode] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<ServiceType[]>([]);
  const [formStep, setFormStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { user, register, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }

    const fetchServiceTypes = async () => {
      try {
        const types = await getServiceTypes();

        setServiceTypes(types);
      } catch (error) {
        console.error('Failed to fetch service types', error);
      }
    };

    const fetchAvailableQualifications = async () => {
      try {
        const qualifications = await getAvailableQualifications();
        setAvailableQualifications(qualifications);
      } catch (error) {
        console.error('Failed to fetch qualifications', error);
      }
    };

    fetchAvailableQualifications();
    fetchServiceTypes();
  }, [user, router]);


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

      if (!selectedQualifications || selectedQualifications.length < 1) newErrors.qualifications = "Qualifications are required";
      if (!selectedServiceTypes || selectedServiceTypes.length < 1) newErrors.expertise = "Expertise is required";
    } else if (formStep === 3) {
      if (!contactInformation) newErrors.contactInformation = "Contact Information is required";
      if (officeAddress.length < 1) newErrors.officeAddress = "Office Address is required";
      if (!operatingCountryCode) newErrors.operatingCountryCode = "Operating Country is required";
      if (!operatingCityCode) newErrors.operatingCityCode = "Operating City is required";
      if (!startShift1) newErrors.startShift1 = "Start Shift 1 is required";
      if (!endShift1) newErrors.endShift1 = "End Shift 1 is required";
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

    const advisorData: AdvisorProfileData = {
      qualifications: selectedQualifications.map(q => q.qualification_id),
      contact_information: contactInformation,
      start_shift_1: startShift1,
      end_shift_1: endShift1,
      start_shift_2: startShift2.length > 0 ? startShift2 : null,
      end_shift_2: endShift2.length > 0 ? endShift2 : null,
      operating_country_code: operatingCountryCode,
      operating_city_code: operatingCityCode,
      office_address: officeAddress,
      selected_service_ids: selectedServiceTypes.map(s => s.service_id),
      display_name: `${firstName} ${lastName}`,
    };

    const profileData: ProfileData = {
      common_data: commonData,
      advisor_data: advisorData,
    };

    await register(email, password, profileData, true);
  };

  return (
    <main>
      <RegisterNavbar />

      <div className='flex items-center justify-center'>
        <div className="relative text-center py-20 px-5 w-full md:w-1/2 lg:w-1/4 space-y-8">
          <h1 className="text-3xl font-bold mb-5">Register as Advisor</h1>
          <p>Will take just a minute</p>
          <div className="relative w-full">
            <AdvisorForm
              formStep={formStep}
              errors={errors}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              firstName={firstName}
              lastName={lastName}
              phoneNumber={phoneNumber}
              address={address}
              selectedOfficeAddress={officeAddress}
              selectedQualifications={selectedQualifications}
              operatingCityCode={operatingCityCode}
              operatingCountryCode={operatingCountryCode}
              setOperatingCityCode={setOperatingCityCode}
              setOperatingCountryCode={setOperatingCountryCode}
              contactInformation={contactInformation}
              startShift1={startShift1}
              endShift1={endShift1}
              startShift2={startShift2}
              endShift2={endShift2}
              setEmail={setEmail}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPhoneNumber={setPhoneNumber}
              setAddress={setAddress}


              setContactInformation={setContactInformation}
              setStartShift1={setStartShift1}
              setEndShift1={setEndShift1}
              setStartShift2={setStartShift1}
              setEndShift2={setEndShift1}
              availableQualifications={availableQualifications}
              availableServiceTypes={serviceTypes}
              setSelectedQualifications={setSelectedQualifications}
              setSelectedOfficeAddress={setOfficeAddress}
              setSelectedServiceTypes={setSelectedServiceTypes}
              selectedServiceTypes={selectedServiceTypes} />
            <div className="flex justify-between mt-6">
              {formStep > 0 && <Button onClick={previousStep}>Back</Button>}
              {formStep < 3 && <Button onClick={nextStep} className="ml-auto bg-cyan-500">Next</Button>}
              {formStep === 3 && <Button onClick={handleSubmit} className="ml-auto bg-cyan-500">Submit</Button>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
