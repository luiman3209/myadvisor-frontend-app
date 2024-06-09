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
import { calculateEndTimes, transformTime } from '@/utils/commonUtils';
import { allTimes } from '@/utils/constants';








interface AdvisorFormProps {
    formStep: number;
    errors: { [key: string]: string };
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    operatingCountryCode: string;
    operatingCityCode: string;
    selectedOfficeAddress: string;
    selectedQualifications: QualificationEntity[];
    availableQualifications: QualificationEntity[];
    selectedServiceTypes: ServiceType[];
    availableServiceTypes: ServiceType[];
    contactInformation: string;
    startShift1: string;
    endShift1: string;
    startShift2: string;
    endShift2: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
    setPhoneNumber: (value: string) => void;
    setAddress: (value: string) => void;
    setSelectedOfficeAddress: (value: string) => void;
    setOperatingCountryCode: (value: string) => void;
    setOperatingCityCode: (value: string) => void;
    setSelectedQualifications: (value: QualificationEntity[]) => void;
    setSelectedServiceTypes: (value: ServiceType[]) => void;
    setContactInformation: (value: string) => void;
    setStartShift1: (value: string) => void;
    setEndShift1: (value: string) => void;
    setStartShift2: (value: string) => void;
    setEndShift2: (value: string) => void;
}



const AdvisorForm: React.FC<AdvisorFormProps> = ({
    formStep, errors, email, password, confirmPassword, firstName, lastName, phoneNumber, operatingCountryCode, operatingCityCode, setOperatingCityCode, setOperatingCountryCode,
    address, selectedOfficeAddress, selectedQualifications, availableQualifications, selectedServiceTypes, availableServiceTypes, contactInformation, startShift1, endShift1,
    setEmail, setPassword, setConfirmPassword, setFirstName, setLastName, setPhoneNumber, setAddress, setSelectedOfficeAddress,
    setSelectedQualifications, setSelectedServiceTypes, setContactInformation, setStartShift1, setEndShift1, setStartShift2, setEndShift2,
}) => {

    const [availableEndTime1, setAvailableEndTime1] = useState<string[]>([]);
    const [availableEndTime2, setAvailableEndTime2] = useState<string[]>([]);



    const updateEndTimes1 = (value: string) => {
        setStartShift1(value);
        setAvailableEndTime1(calculateEndTimes(value));
    };

    const updateEndTimes2 = (value: string) => {
        setStartShift2(value);
        setAvailableEndTime2(calculateEndTimes(value));
    };

    const resetOfficeAddress = () => {
        setSelectedOfficeAddress('');
    };

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

                        <p>Professional profile informations</p>
                        <div className='space-y-4 '>
                            <Label> Qualifications</Label>

                            <QualificationPicker qualifications={availableQualifications}
                                selectedQualifications={selectedQualifications}
                                setSelectedQualifications={setSelectedQualifications} />
                        </div>

                        <div className='space-y-4 text-left'>
                            <Label> Expertise</Label>

                            <ServiceTypePicker serviceTypes={availableServiceTypes}
                                selectedServiceTypes={selectedServiceTypes}
                                setSelectedServiceTypes={setSelectedServiceTypes} />
                        </div>

                    </>
                )}
                {formStep === 3 && (


                    <>

                        <p>Offices and booking informations</p>
                        <Label>Contact Information</Label>
                        <ShakeableInput
                            type="text"
                            placeholder="Work email "
                            value={contactInformation}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setContactInformation(e.target.value)}
                            error={errors.contactInformation}
                        />

                        <div className='flex space-x-2'>
                            <CountryPicker countryCode={operatingCountryCode} setCountryCode={setOperatingCountryCode} />

                            <ShakeableInput
                                type="text"
                                placeholder="ZIP CODE"
                                value={operatingCityCode}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setOperatingCityCode(e.target.value)}
                                error={errors.operatingCityCode}
                            />
                        </div>



                        <Label className=''>Office address</Label>
                        {selectedOfficeAddress ?
                            <Card className='flex flex-row space-x-2 p-2 items-center'>

                                <span>{selectedOfficeAddress}</span><Pencil onClick={resetOfficeAddress} className="w-4 h-4 text-black" />
                            </Card>
                            : <AddressPicker onAddressSelect={setSelectedOfficeAddress} />}

                        <div className='flex space-x-12'>
                            <div>
                                <Label className="">Availability window start time</Label>
                                <Select onValueChange={updateEndTimes1}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Pick start time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>

                                            {allTimes.map((time) => {

                                                return <SelectItem key={time.concat('start1')} value={time}>{transformTime(time)}</SelectItem>

                                            })}

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Availability window end time</Label>
                                <Select onValueChange={setEndShift1}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Pick end time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {availableEndTime1.map((time) => {
                                                return <SelectItem key={time.concat('end1')} value={time}>{transformTime(time)}</SelectItem>
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>



                    </>
                )}
            </motion.div>
        </div>

    );
};

export default AdvisorForm;
