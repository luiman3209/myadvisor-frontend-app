import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import ShakeableInput from "../input/ShakableInput";
import { updateProfile } from "@/services/profileService";
import { CommonProfileData, AdvisorProfileData } from "@/types/auth";
import { checkEmailAvailability, updateUser } from "@/services/authService";
import { ServiceTypePicker } from "../input/ServiceTypePicker";
import { CountryPicker } from "../input/CountryPicker";
import { ServiceType } from "@/types/entity/service_type_entity";

import { Label } from "../ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Info, Pencil, Lock } from "lucide-react";
import { AdvisorPrivateProfileRespDto } from "@/types/types";
import { createOrUpdateAdvisor } from "@/services/advisorService";
import AddressPicker from "../input/AddressPicker";
import { QualificationPicker } from "../input/QualificationPicker";
import { QualificationEntity } from "@/types/entity/qualification_entity";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { calculateEndTimes, transformTime } from "@/utils/commonUtils";
import { allTimes } from "@/utils/constants";
import AlertNotification from "../misc/AlertNotification";

interface AdvisorProfileProps {
    advisorProfile: AdvisorPrivateProfileRespDto;
    availableServiceTypes: ServiceType[];
    availableQualifications: QualificationEntity[];
}

const AdvisorProfile: React.FC<AdvisorProfileProps> = ({ advisorProfile, availableServiceTypes, availableQualifications }) => {

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [firstName, setFirstName] = useState<string>(advisorProfile.userProfile.first_name);
    const [lastName, setLastName] = useState<string>(advisorProfile.userProfile.last_name);
    const [phoneNumber, setPhoneNumber] = useState<string>(advisorProfile.userProfile.phone_number);
    const [address, setAddress] = useState<string>(advisorProfile.userProfile.address);

    const [email, setEmail] = useState<string>(advisorProfile.advisor.user_config.email);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [displayName, setDisplayName] = useState<string>(advisorProfile.advisor.display_name);
    const [contactInformation, setContactInformation] = useState<string>(advisorProfile.advisor.contact_information);
    const [officeAddress, setOfficeAddress] = useState<string>(advisorProfile.advisor.office_address);
    const [operatingZipCode, setOperatingZipCode] = useState<string>(advisorProfile.advisor.operating_city_code);
    const [operatingCountryCode, setOperatingCountryCode] = useState<string>(advisorProfile.advisor.operating_country_code);
    const [startShift1, setStartShift1] = useState<string>(advisorProfile.advisor.start_shift_1);
    const [endShift1, setEndShift1] = useState<string>(advisorProfile.advisor.end_shift_1);
    const [startShift2, setStartShift2] = useState<string>(advisorProfile.advisor.start_shift_2);
    const [endShift2, setEndShift2] = useState<string>(advisorProfile.advisor.end_shift_2);
    const [availableEndTime1, setAvailableEndTime1] = useState<string[]>([]);
    const [availableEndTime2, setAvailableEndTime2] = useState<string[]>([]);

    const [fieldsChanged, setFieldsChanged] = useState<boolean>(false);

    const [selectedServiceTypes, setSelectedServiceTypes] = useState<number[]>(advisorProfile.serviceTypes);
    const [selectedQualifications, setSelectedQualifications] = useState<number[]>(advisorProfile.qualifications);

    const [selectedTab, setSelectedTab] = useState<string>('general');
    const [updateMessage, setUpdateMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        setAvailableEndTime1(calculateEndTimes(startShift1));
    }, [startShift1]);

    const initialProfileState = {
        firstName: advisorProfile.userProfile.first_name,
        lastName: advisorProfile.userProfile.last_name,
        phoneNumber: advisorProfile.userProfile.phone_number,
        address: advisorProfile.userProfile.address,
        email: advisorProfile.advisor.user_config.email,
        displayName: advisorProfile.advisor.display_name,
        contactInformation: advisorProfile.advisor.contact_information,
        officeAddress: advisorProfile.advisor.office_address,
        operatingZipCode: advisorProfile.advisor.operating_city_code,
        operatingCountryCode: advisorProfile.advisor.operating_country_code,
        startShift1: advisorProfile.advisor.start_shift_1,
        endShift1: advisorProfile.advisor.end_shift_1,
        startShift2: advisorProfile.advisor.start_shift_2,
        endShift2: advisorProfile.advisor.end_shift_2,
        selectedServiceTypes: advisorProfile.serviceTypes,
        selectedQualifications: advisorProfile.qualifications
    };

    useEffect(() => {
        const hasFieldChanged = () => {
            return (
                firstName !== initialProfileState.firstName ||
                lastName !== initialProfileState.lastName ||
                phoneNumber !== initialProfileState.phoneNumber ||
                address !== initialProfileState.address ||
                email !== initialProfileState.email ||
                displayName !== initialProfileState.displayName ||
                contactInformation !== initialProfileState.contactInformation ||
                officeAddress !== initialProfileState.officeAddress ||
                operatingZipCode !== initialProfileState.operatingZipCode ||
                operatingCountryCode !== initialProfileState.operatingCountryCode ||
                startShift1 !== initialProfileState.startShift1 ||
                endShift1 !== initialProfileState.endShift1 ||
                startShift2 !== initialProfileState.startShift2 ||
                endShift2 !== initialProfileState.endShift2 ||
                selectedServiceTypes.some((type) => !initialProfileState.selectedServiceTypes.includes(type)) ||
                selectedQualifications.some((qual) => !initialProfileState.selectedQualifications.includes(qual))
            );
        };

        console.log('Address:', address,)

        setFieldsChanged(hasFieldChanged());
    }, [
        firstName, lastName, phoneNumber, address, email,
        displayName, contactInformation, officeAddress,
        operatingZipCode, operatingCountryCode, startShift1,
        endShift1, startShift2, endShift2, selectedServiceTypes, selectedQualifications
    ]);

    const changeTab = (tab: string) => {
        console.log('Address:', address,)
        setSelectedTab(tab);
    }

    const requestUpdate = (tab: string) => {
        try {
            if (tab === 'general') {
                updateProfileData();
            }
            else if (tab === 'advisor') {
                updateAdvisorInfo();
            }
            else if (tab === 'security') {
                updateUserData();
            }
            setFieldsChanged(false);

        } catch (err) {
            showError('Something went wrong during update, refresh and try again');
        }


    };

    const updateSelectedQualifications = (qualifications: QualificationEntity[]) => {
        setSelectedQualifications(qualifications.map((q) => q.qualification_id));
    }

    const updateSelectedServiceTypes = (serviceTypes: ServiceType[]) => {
        setSelectedServiceTypes(serviceTypes.map((q) => q.service_id));
    }

    const showError = (message: string) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    }

    const showSuccess = (message: string) => {
        setUpdateMessage(message);
        setTimeout(() => {
            setUpdateMessage('');
        }, 5000);
    }

    const validateProfileData = async (data: CommonProfileData) => {
        const newErrors: { [key: string]: string } = {};
        if (!data.first_name) {
            newErrors.first_name = 'First name is required';
        }
        if (data.first_name.length < 2) {
            newErrors.first_name = 'First name must be at least 2 characters';
        }
        if (!data.last_name) {
            newErrors.last_name = 'Last name is required';
        }
        if (data.last_name.length < 2) {
            newErrors.last_name = 'Last name must be at least 2 characters';
        }
        if (!data.phone_number) {
            newErrors.phone_number = 'Phone number is required';
        }
        if (!/^\d+$/.test(phoneNumber)) newErrors.phoneNumber = "Phone Number must contain only digits";
        if (data.phone_number.length < 10) {
            newErrors.phone_number = 'Phone number must be at least 10 characters';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const updateProfileData = async () => {
        const profileData: CommonProfileData = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            address: address,
        };
        try {
            if (await validateProfileData(profileData)) {
                await updateProfile(profileData);
                showSuccess('Profile updated successfully');
            }
        }
        catch (err) {
            throw err;
        }
    }

    const validateAdvisorInfo = async (data: AdvisorProfileData) => {
        const newErrors: { [key: string]: string } = {};
        if (!data.display_name) {
            newErrors.display_name = 'Display name is required';
        }
        if (!data.contact_information) {
            newErrors.contact_information = 'Contact information is required';
        }
        if (!data.office_address) {
            newErrors.office_address = 'Office address is required';
        }
        if (!data.operating_city_code) {
            newErrors.operating_city_code = 'Operating city is required';
        }
        if (!data.operating_country_code) {
            newErrors.operating_country_code = 'Operating country is required';
        }
        if (!data.start_shift_1) {
            newErrors.start_shift_1 = 'Start shift 1 is required';
        }
        if (!data.end_shift_1) {
            newErrors.end_shift_1 = 'End shift 1 is required';
        }
        if (data.start_shift_2 && !data.end_shift_2) {
            newErrors.end_shift_2 = 'End time of the second availability window is required if start time is provided';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const updateAdvisorInfo = async () => {
        const advisorData: AdvisorProfileData = {
            display_name: displayName,
            contact_information: contactInformation,
            office_address: officeAddress,
            operating_city_code: operatingZipCode,
            operating_country_code: operatingCountryCode,
            start_shift_1: startShift1,
            end_shift_1: endShift1,
            start_shift_2: startShift2,
            end_shift_2: endShift2,
            selected_service_ids: selectedServiceTypes,
            qualifications: selectedQualifications
        };

        try {
            if (await validateAdvisorInfo(advisorData)) {
                await createOrUpdateAdvisor(advisorData);
                showSuccess('Advisor profile updated successfully');
            }
        }
        catch (err) {
            throw err;
        }
    }

    const validateUserData = async (email: string, password: string | undefined) => {
        const newErrors: { [key: string]: string } = {};

        if (email) {
            if (email.length < 6) {
                newErrors.email = 'Email must be at least 6 characters';
            }
            if (! await checkEmailAvailability(email)) newErrors.email = "Email is already taken";
        }

        if (password) {
            if (password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters';
            }
            if (password !== confirmPassword) {
                newErrors.password = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const updateUserData = async () => {
        try {
            if (await validateUserData(email, password)) {
                await updateUser(email, password);
                showSuccess('User data updated successfully');
            }
        }
        catch (err) {
            throw err;
        }
    }

    const resetOfficeAddress = () => {
        setOfficeAddress('');
    };

    const updateEndTimes1 = (value: string) => {
        setStartShift1(value);
        setAvailableEndTime1(calculateEndTimes(value));
    };

    return (
        <div className=" w-full min-h-screen bg-gray-100">

            <main className="relative flex flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Profile</h1>
                </div>

                {/** Message alert */}
                {
                    errorMessage && <AlertNotification
                        isError={true}
                        title="Something went wrong!"
                        message={errorMessage}
                    />
                }
                {/** Success alert */}
                {
                    updateMessage &&
                    <AlertNotification
                        isError={false}
                        title="Profile Updated!"
                        message="Your profile is now up to date. Thanks for staying current!"
                    />

                }

                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] ">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <Link href="#" className={selectedTab === 'general' ? "font-semibold text-primary" : ""} onClick={() => changeTab('general')}>
                            General
                        </Link>
                        <Link href="#" className={selectedTab === 'advisor' ? "font-semibold text-primary" : ""} onClick={() => changeTab('advisor')}>Advisor info</Link>
                        <div className="flex flex-row items-center text-gray-400">

                            {/* <Link href="#" className={selectedTab === 'security' ? "font-semibold text-primary" : ""} onClick={() => changeTab('security')}> Security</Link>*/}
                            Security
                            <Lock className="w-3 h-3 ml-1" />

                        </div>
                    </nav>

                    <div className="flex flex-col">
                        <Card>
                            <CardHeader>
                                <CardTitle>{selectedTab === 'general' ? 'General' : selectedTab === 'advisor' ? 'Advisor' : 'Security'}</CardTitle>
                                <CardDescription>
                                    {selectedTab === 'advisor' ? 'Advisor profile info' : selectedTab === 'security' ? 'Account and security info' : 'General profile info'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {selectedTab === 'general' ?
                                    <form className="flex flex-col space-y-4">
                                        <Label htmlFor="first_name">First name</Label>
                                        <ShakeableInput
                                            type="text"
                                            placeholder="First name"
                                            value={firstName}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                                            error={errors.first_name}
                                        />
                                        <Label htmlFor="last_name">Last name</Label>
                                        <ShakeableInput
                                            type="text"
                                            placeholder="Last name"
                                            value={lastName}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                                            error={errors.last_name}
                                        />
                                        <Label htmlFor="phone_number">Phone number</Label>
                                        <ShakeableInput
                                            type="text"
                                            placeholder="Phone number"
                                            value={phoneNumber}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                                            error={errors.phone_number}
                                        />
                                        <Label htmlFor="address">Address</Label>
                                        <ShakeableInput
                                            type="text"
                                            placeholder="Address"
                                            value={address}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                                            error={errors.address}
                                        />
                                    </form>
                                    : selectedTab === 'advisor' ?
                                        <form className="flex flex-col space-y-4">
                                            <Label htmlFor="display_name">Display name</Label>
                                            <ShakeableInput
                                                type="text"
                                                placeholder="Display name"
                                                value={displayName}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
                                                error={errors.display_name}
                                            />
                                            <Label htmlFor="contact_information">Contact information</Label>
                                            <ShakeableInput
                                                type="text"
                                                placeholder="Contact information"
                                                value={contactInformation}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setContactInformation(e.target.value)}
                                                error={errors.contact_information}
                                            />
                                            <Label htmlFor="operating_country_code">Operating country</Label>
                                            <CountryPicker countryCode={operatingCountryCode} setCountryCode={setOperatingCountryCode} />
                                            <Label htmlFor="operating_city_code">Operating city zip code</Label>
                                            <ShakeableInput
                                                type="text"
                                                placeholder="City preference"
                                                value={operatingZipCode}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setOperatingZipCode(e.target.value)}
                                                error={errors.operating_city_code}
                                            />
                                            <Label htmlFor="office_address">Office address</Label>
                                            {officeAddress ?
                                                <Card className='flex flex-row space-x-2 p-2 items-center'>
                                                    <span>{officeAddress}</span>
                                                    <Pencil onClick={resetOfficeAddress} className="w-4 h-4 text-black" />
                                                </Card>
                                                : <AddressPicker onAddressSelect={setOfficeAddress} />}
                                            <div className='space-y-4'>
                                                <Label> Qualifications</Label>
                                                <QualificationPicker
                                                    qualifications={availableQualifications}
                                                    selectedQualifications={availableQualifications.filter((q) => selectedQualifications.includes(q.qualification_id))}
                                                    setSelectedQualifications={updateSelectedQualifications}
                                                />
                                            </div>
                                            <div className='space-y-4 text-left'>
                                                <Label> Expertise</Label>
                                                <ServiceTypePicker
                                                    serviceTypes={availableServiceTypes}
                                                    selectedServiceTypes={availableServiceTypes.filter((q) => selectedServiceTypes.includes(q.service_id))}
                                                    setSelectedServiceTypes={updateSelectedServiceTypes}
                                                />
                                            </div>
                                            <div>
                                                <Label className="">Availability window start time</Label>
                                                <Select onValueChange={updateEndTimes1} value={startShift1}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Pick start time" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {allTimes.map((time) => (
                                                                <SelectItem key={time.concat('start1')} value={time}>{transformTime(time)}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Availability window end time</Label>
                                                <Select onValueChange={setEndShift1} value={endShift1}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Pick end time" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {availableEndTime1.map((time) => (
                                                                <SelectItem key={time.concat('end1')} value={time}>{transformTime(time)}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </form>
                                        : selectedTab === 'security' ?
                                            <form className="flex flex-col space-y-4">
                                                <Label htmlFor="email">Email</Label>
                                                <ShakeableInput
                                                    type="email"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                                    error={errors.email}
                                                />
                                                <Label htmlFor="password">Password</Label>
                                                <ShakeableInput
                                                    type={password ? "password" : "text"}
                                                    placeholder="Update password"
                                                    value={password ? password : ''}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                                    error={errors.password}
                                                />
                                                {password && <ShakeableInput
                                                    type="password"
                                                    placeholder="Confirm password"
                                                    value={confirmPassword}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                                    error={errors.password}
                                                />}
                                            </form>
                                            : null}
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4 space-x-2">
                                <Button
                                    className={fieldsChanged ? "bg-cyan-500" : "bg-cyan-200"}
                                    disabled={!fieldsChanged}
                                    onClick={() => requestUpdate(selectedTab)}
                                >Save</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdvisorProfile;
