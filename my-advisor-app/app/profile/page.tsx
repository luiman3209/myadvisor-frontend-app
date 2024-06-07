// app/profile/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getProfile } from '@/services/profileService';
import { getInvestorProfile } from '@/services/investorService';
import { getAdvisorProfile } from '@/services/advisorService';
import ProtectedRoute from '@/components/auth/ProtectedRoutes';
import InvestorProfile from '@/components/profile/InvestorProfile';
import { AdvisorProfileDto, InvestorProfileDto } from '@/types/types';
import { ServiceType } from '@/types/entity/service_type_entity';
import { getServiceTypes } from '@/services/serviceTypesService';
import Navbar from '@/components/navbar/NavBar';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [investorProfile, setInvestorProfile] = useState<InvestorProfileDto | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorProfileDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availableServiceTypes, setAvailableServiceTypes] = useState<ServiceType[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {

        const profileData = await getProfile();
        setProfile(profileData);

        if (user?.role === 'investor') {
          const investorData: InvestorProfileDto = await getInvestorProfile();
          console.log('investorData', investorData)
          setInvestorProfile(investorData);
        } else if (user?.role === 'advisor') {
          const advisorData: AdvisorProfileDto = await getAdvisorProfile();
          setAdvisorProfile(advisorData);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchServiceTypes = async () => {
      try {

        setAvailableServiceTypes(await getServiceTypes());

      } catch (error) {
        console.error('Failed to fetch service types', error);
      }
    };

    if (user) {
      fetchProfile();
      fetchServiceTypes();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProtectedRoute>
      <Navbar />
      {user?.role === 'investor' && investorProfile && <InvestorProfile investorProfile={investorProfile} availableServiceTypes={availableServiceTypes} />}

    </ProtectedRoute>
  );
};

export default Profile;


