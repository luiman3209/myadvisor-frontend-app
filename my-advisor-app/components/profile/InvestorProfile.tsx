import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { Input } from "@/components/ui/input"
import { AdvisorProfileDto, InvestorProfileDto } from '@/types/types';
import ShakeableInput from "../input/ShakableInput";
import { ChangeEvent, useState } from "react";
import { updateProfile } from "@/services/profileService";
import { CommonProfileData, InvestorProfileData } from "@/types/auth";
import { checkEmailAvailability, updateUser } from "@/services/authService";
import { createOrUpdateInvestor } from "@/services/investorService";
import { ServiceTypePicker } from "../input/ServiceTypePicker";
import { CountryPicker } from "../input/CountryPicker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ServiceType } from "@/types/entity/service_type_entity";

import { netWorthOptions, incomeRangeOptions } from "@/utils/constants";

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
    const [email, setEmail] = useState<string>(investorProfile.investor.user.email);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [selectedServiceTypes, setSelectedServiceTypes] = useState(investorProfile.serviceTypes);

    const [selectedTab, setSelectedTab] = useState<string>('general');

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
    }

    const updateProfileData = async () => {
        const profileData: CommonProfileData = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            address: address,
        };

        if (await validateProfileData(profileData)) {
            await updateProfile(profileData);
        }

    }

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
    }

    const updateInvestorInfo = async () => {


        const investorData: InvestorProfileData = {
            net_worth: netWorth,
            income_range: incomeRange,
            geo_preferences: geoPreferences,
            serviceTypes: selectedServiceTypes,
        };

        if (await validateInvestorInfo(investorData)) {
            await createOrUpdateInvestor(investorData);
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

        if (await validateUserData(email, password)) {
            await updateUser(email, password);
        }



    }

    return (
        <div className="flex min-h-screen w-full flex-col">

            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Profile</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                        <Link href="#" className="font-semibold text-primary" onClick={() => setSelectedTab('general')}>
                            General
                        </Link>
                        <Link href="#" onClick={() => setSelectedTab('investor')}>Investor info</Link>
                        <Link href="#" onClick={() => setSelectedTab('security')}>Security</Link>

                    </nav>
                    <div className="grid gap-6">
                        {selectedTab === 'general' &&
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>General</CardTitle>
                                    <CardDescription>
                                        General profile info
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <ShakeableInput type="text"
                                            placeholder="First name"
                                            value={investorProfile.userProfile.first_name}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                                            error={errors.first_name}
                                        />
                                        <ShakeableInput type="text"
                                            placeholder="Last name"
                                            value={investorProfile.userProfile.last_name}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                                            error={errors.last_name}
                                        />
                                        <ShakeableInput type="text"
                                            placeholder="Phone number"
                                            value={investorProfile.userProfile.phone_number}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                                            error={errors.phone_number}
                                        />
                                        <ShakeableInput type="text"
                                            placeholder="Address"
                                            value={investorProfile.userProfile.address}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                                            error={errors.address}
                                        />


                                    </form>
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4">
                                    <Button onClick={updateProfileData}>Save</Button>
                                </CardFooter>
                            </Card>}

                        {selectedTab === 'investor' &&
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>Investor</CardTitle>
                                    <CardDescription>
                                        Investor profile info
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>

                                        <ServiceTypePicker serviceTypes={availableServiceTypes}
                                            selectedServiceTypes={selectedServiceTypes}
                                            setSelectedServiceTypes={setSelectedServiceTypes} />

                                        <CountryPicker countryCode={geoPreferences} setCountryCode={setGeoPreferences} />

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

                                    </form>
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4">
                                    <Button onClick={updateInvestorInfo}>Save</Button>
                                </CardFooter>
                            </Card>
                        }
                        {selectedTab === 'security' &&
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>Security</CardTitle>
                                    <CardDescription>
                                        Account and security info
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <Input placeholder="Email"
                                        />
                                        <Input placeholder="Password" />


                                    </form>
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4">
                                    <Button onClick={updateUserData}>Save</Button>
                                </CardFooter>
                            </Card>
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}
export default InvestorProfile;