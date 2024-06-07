import { motion } from 'framer-motion';

import { ChangeEvent, useState } from 'react';
import ShakeableInput from '../input/ShakableInput';
import { Input } from '../ui/input';

import { QualificationPicker } from '../input/QualificationPicker';

import { QualificationEntity } from '@/types/entity/qualification_entity';
import { Label } from '../ui/label';
import { ServiceTypePicker } from '../input/ServiceTypePicker';
import { ServiceType } from '@/types/entity/service_type_entity';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import AddressPicker from '../input/AddressPicker';
import { CountryPicker } from '../input/CountryPicker';
import { Pencil } from 'lucide-react';
import { Card } from '../ui/card';
import { incomeRangeOptions, netWorthOptions } from '@/utils/constants';



interface InvestorFormProps {
    formStep: number;
    errors: { [key: string]: string };
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
    address: string;
    setAddress: (address: string) => void;
    netWorth: string;
    setNetWorth: (netWorth: string) => void;
    incomeRange: string;
    setIncomeRange: (incomeRange: string) => void;
    geoPreferences: string;
    setGeoPreferences: (geoPreferences: string) => void;
    selectedServiceTypes: ServiceType[];
    setSelectedServiceTypes: (selectedServiceTypes: ServiceType[]) => void;
    availableServiceTypes: ServiceType[];

}



const InvestorForm: React.FC<InvestorFormProps> = ({
    formStep, errors,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    firstName, setFirstName,
    lastName, setLastName,
    phoneNumber, setPhoneNumber,
    address, setAddress,
    netWorth, setNetWorth,
    incomeRange, setIncomeRange,
    geoPreferences, setGeoPreferences,
    selectedServiceTypes, setSelectedServiceTypes,
    availableServiceTypes
}) => {


    return (
        <div className="text-left">
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                    hidden: { opacity: 0, x: 100, transition: { duration: 0.4 } },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                    exit: { opacity: 0, x: -100, transition: { duration: 0.4 } }
                }}
                key={formStep}
                className="flex flex-col  space-y-6"
            >
                {formStep === 0 && (
                    <>
                        <ShakeableInput
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            error={errors.email}
                        />
                        <ShakeableInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            error={errors.password}
                        />
                        <Input type="password" placeholder="Confirm password" onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
                    </>
                )}
                {formStep === 1 && (
                    <>
                        <p>Personal profile informations</p>
                        <ShakeableInput
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                            error={errors.firstName}
                        />
                        <ShakeableInput
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                            error={errors.lastName}
                        />
                        <ShakeableInput
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                            error={errors.phoneNumber}
                        />

                        <ShakeableInput
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                            error={errors.address}
                        />
                    </>
                )}
                {formStep === 2 && (
                    <>

                        <p>Professional profile preferences</p>


                        <div className='space-y-4 text-left'>
                            <Label> Expertise</Label>
                            <ServiceTypePicker serviceTypes={availableServiceTypes}
                                selectedServiceTypes={selectedServiceTypes}
                                setSelectedServiceTypes={setSelectedServiceTypes} />
                        </div>

                        <Label className="">Country preference</Label>
                        <CountryPicker countryCode={geoPreferences} setCountryCode={setGeoPreferences} />

                    </>
                )}
                {formStep === 3 && (


                    <>

                        <p>Investor profile informations</p>
                        <Label className="">Net worth</Label>
                        <Select onValueChange={setNetWorth}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={netWorth ? undefined : '-'} defaultValue={netWorth ? netWorth : undefined} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>

                                    {netWorthOptions.map((option) => {

                                        return <SelectItem key={option} value={option}>{'\$'.concat(option)}</SelectItem>

                                    })}

                                </SelectGroup>
                            </SelectContent>
                        </Select>


                        <Label className="">Income range</Label>
                        <Select onValueChange={setIncomeRange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={incomeRange ? undefined : '-'} defaultValue={incomeRange ? incomeRange : undefined} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>

                                    {incomeRangeOptions.map((option) => {

                                        return <SelectItem key={option} value={option}>{'\$'.concat(option)}</SelectItem>

                                    })}

                                </SelectGroup>
                            </SelectContent>

                        </Select>





                    </>
                )}
            </motion.div>
        </div>

    );
};

export default InvestorForm;
