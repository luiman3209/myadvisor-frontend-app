import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { InvestorProfileDto } from '@/types/types';
import ShakeableInput from "../input/ShakableInput";
import { updateProfile } from "@/services/profileService";
import { CommonProfileData, InvestorProfileData } from "@/types/auth";
import { checkEmailAvailability, updateUser } from "@/services/authService";
import { createOrUpdateInvestor } from "@/services/investorService";
import { ServiceTypePicker } from "../input/ServiceTypePicker";
import { CountryPicker } from "../input/CountryPicker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ServiceType } from "@/types/entity/service_type_entity";

import { netWorthOptions, incomeRangeOptions } from "@/utils/constants";
import { Label } from "../ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Info } from "lucide-react";

interface InvestorProfileProps {
    investorProfile: InvestorProfileDto;
    availableServiceTypes: ServiceType[];
}

const InvestorProfile: React.FC<InvestorProfileProps> = ({ investorProfile, availableServiceTypes }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [firstName, setFirstName] = useState<string>(investorProfile.userProfile.first_name);
    const [lastName, setLastName] = useState<string>(investorProfile.userProfile.last_name);
    const [phoneNumber, setPhoneNumber] = useState<string>(investorProfile.userProfile.phone_number);
    const [address, setAddress] = useState<string>(investorProfile.userProfile.address);
    const [netWorth, setNetWorth] = useState<string>(investorProfile.investor.net_worth);
    const [incomeRange, setIncomeRange] = useState<string>(investorProfile.investor.income_range);
    const [geoPreferences, setGeoPreferences] = useState<string>(investorProfile.investor.geo_preferences);
    const [email, setEmail] = useState<string>(investorProfile.investor.user_config.email);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [selectedServiceTypes, setSelectedServiceTypes] = useState(investorProfile.serviceTypes);

    const [selectedTab, setSelectedTab] = useState<string>('general');
    const [updateMessage, setUpdateMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [fieldsChanged, setFieldsChanged] = useState<boolean>(false);

    const initialProfileState = {
        firstName: investorProfile.userProfile.first_name,
        lastName: investorProfile.userProfile.last_name,
        phoneNumber: investorProfile.userProfile.phone_number,
        address: investorProfile.userProfile.address,
        netWorth: investorProfile.investor.net_worth,
        incomeRange: investorProfile.investor.income_range,
        geoPreferences: investorProfile.investor.geo_preferences,
        email: investorProfile.investor.user_config.email,
        selectedServiceTypes: investorProfile.serviceTypes
    };

    useEffect(() => {
        const hasFieldChanged = () => {
            return (
                firstName !== initialProfileState.firstName ||
                lastName !== initialProfileState.lastName ||
                phoneNumber !== initialProfileState.phoneNumber ||
                address !== initialProfileState.address ||
                netWorth !== initialProfileState.netWorth ||
                incomeRange !== initialProfileState.incomeRange ||
                geoPreferences !== initialProfileState.geoPreferences ||
                email !== initialProfileState.email ||
                selectedServiceTypes.some((type) => !initialProfileState.selectedServiceTypes.map(s => s.service_id).includes(type.service_id))
            );
        };

        setFieldsChanged(hasFieldChanged());
    }, [
        firstName, lastName, phoneNumber, address, netWorth,
        incomeRange, geoPreferences, email, selectedServiceTypes
    ]);

    const changeTab = (tab: string) => {
        setFieldsChanged(false);
        setSelectedTab(tab);
    };

    const requestUpdate = (tab: string) => {
        if (tab === 'general') {
            updateProfileData();
        }
        else if (tab === 'investor') {
            updateInvestorInfo();
        }
        else if (tab === 'security') {
            updateUserData();
        }
        setFieldsChanged(false);
    };

    const showError = (message: string) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    };

    const showSuccess = (message: string) => {
        setUpdateMessage(message);
        setTimeout(() => {
            setUpdateMessage('');
        }, 5000);
    };

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
        if (data.phone_number.length < 10) {
            newErrors.phone_number = 'Phone number must be at least 10 characters';
        }
        if (!data.address) {
            newErrors.address = 'Address is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
            showError('Something went wrong during update, refresh and try again');
        }
    };

    const validateInvestorInfo = async (data: InvestorProfileData) => {
        const newErrors: { [key: string]: string } = {};
        if (!data.net_worth) {
            newErrors.net_worth = 'Net worth is required';
        }
        if (!data.income_range) {
            newErrors.income_range = 'Income range is required';
        }
        if (!data.geo_preferences) {
            newErrors.geo_preferences = 'Geographical preferences is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateInvestorInfo = async () => {
        const investorData: InvestorProfileData = {
            net_worth: netWorth,
            income_range: incomeRange,
            geo_preferences: geoPreferences,
            selected_service_ids: selectedServiceTypes.map(s => s.service_id),
        };

        try {
            if (await validateInvestorInfo(investorData)) {
                await createOrUpdateInvestor(investorData);
                showSuccess('Investor profile updated successfully');
            }
        }
        catch (err) {
            showError('Something went wrong during update, refresh and try again');
        }
    };

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
    };

    const updateUserData = async () => {
        try {
            if (await validateUserData(email, password)) {
                await updateUser(email, password);
                showSuccess('User data updated successfully');
            }
        }
        catch (err) {
            showError('Something went wrong during update, refresh and try again');
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Profile</h1>
                </div>

                {/** Message alert */}
                {
                    errorMessage && <div className="fixed bottom-0 right-0 mb-4 mr-4">
                        <Alert className="bg-red-500 text-white">
                            <Info className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {errorMessage}
                            </AlertDescription>
                        </Alert>
                    </div>
                }
                {/** Success alert */}
                {
                    updateMessage && <div className="fixed bottom-0 right-0 mb-4 mr-4">
                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Profile Updated!</AlertTitle>
                            <AlertDescription>
                                Your profile is now up to date. Thanks for staying current!
                            </AlertDescription>
                        </Alert>
                    </div>
                }

                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <Link href="#" className={selectedTab === 'general' ? "font-semibold text-primary" : ""} onClick={() => changeTab('general')}>
                            General
                        </Link>
                        <Link href="#" className={selectedTab === 'investor' ? "font-semibold text-primary" : ""} onClick={() => changeTab('investor')}>Investor info</Link>
                        <Link href="#" className={selectedTab === 'security' ? "font-semibold text-primary" : ""} onClick={() => changeTab('security')}>Security</Link>
                    </nav>

                    <div className="flex flex-col">
                        <Card>
                            <CardHeader>
                                <CardTitle>{selectedTab === 'general' ? 'General' : selectedTab === 'investor' ? 'Investor' : 'Security'}</CardTitle>
                                <CardDescription>
                                    {selectedTab === 'investor' ? 'Investor profile info' : selectedTab === 'security' ? 'Account and security info' : 'General profile info'}
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
                                    : selectedTab === 'investor' ?
                                        <form className="flex flex-col space-y-4">
                                            <Label htmlFor="service_types">Service preferences</Label>
                                            <ServiceTypePicker
                                                serviceTypes={availableServiceTypes.filter((serviceType) => !selectedServiceTypes.map(e => e.service_id).includes(serviceType.service_id))}
                                                selectedServiceTypes={selectedServiceTypes}
                                                setSelectedServiceTypes={setSelectedServiceTypes}
                                            />
                                            <Label htmlFor="geo_preferences">Country preference</Label>
                                            <CountryPicker countryCode={geoPreferences} setCountryCode={setGeoPreferences} />
                                            <Label htmlFor="net_worth">Net worth range</Label>
                                            <Select onValueChange={setNetWorth} value={netWorth}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder={netWorth ? undefined : '-'} defaultValue={netWorth ? netWorth : undefined} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {netWorthOptions.map((option) => (
                                                            <SelectItem key={option} value={option}>{'\$'.concat(option)}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <Label htmlFor="income_range">Income range</Label>
                                            <Select onValueChange={setIncomeRange} value={incomeRange}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder={incomeRange ? undefined : '-'} defaultValue={incomeRange ? incomeRange : undefined} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {incomeRangeOptions.map((option) => (
                                                            <SelectItem key={option} value={option}>{'\$'.concat(option)}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
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

export default InvestorProfile;
