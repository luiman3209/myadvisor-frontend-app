// app/profile/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getProfile } from '@/services/profileService';
import { getInvestorProfile } from '@/services/investorService';
import { getAdvisorProfile } from '@/services/advisorService';

import InvestorProfile from '@/components/profile/InvestorProfile';
import { AdvisorPrivateProfileRespDto, InvestorProfileDto } from '@/types/types';
import { ServiceType } from '@/types/entity/service_type_entity';
import { getServiceTypes } from '@/services/serviceTypesService';
import Navbar from '@/components/navbar/NavBar';
import { useRouter } from 'next/navigation';
import AdvisorProfile from '@/components/profile/AdvisorProfile';
import { QualificationEntity } from '@/types/entity/qualification_entity';
import { getAvailableQualifications } from '@/services/qualificationService';
import CircularProgress from '@/components/misc/CircularProgress';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [investorProfile, setInvestorProfile] = useState<InvestorProfileDto | null>(null);
  const [advisorProfile, setAdvisorProfile] = useState<AdvisorPrivateProfileRespDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availableServiceTypes, setAvailableServiceTypes] = useState<ServiceType[]>([]);
  const [availableQualifications, setAvailableQualifications] = useState<QualificationEntity[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {

        const profileData = await getProfile();
        setProfile(profileData);

        if (user?.role === 'investor') {
          const investorData: InvestorProfileDto = await getInvestorProfile();
          setInvestorProfile(investorData);
        } else if (user?.role === 'advisor') {
          const advisorData: AdvisorPrivateProfileRespDto = await getAdvisorProfile();

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
        setError('Failed to fetch service types');
      }
    };

    const fetchQualifications = async () => {
      try {
        setAvailableQualifications(await getAvailableQualifications());
      } catch (error) {
        setError('Failed to fetch qualifications');
      }
    }

    if (user) {

      fetchProfile();
      fetchServiceTypes();
      fetchQualifications();

    }
  }, [router, user]);


  return (
    <div>
      <Navbar />

      {loading ? <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <CircularProgress size={100} strokeWidth={10} initialProgress={0} interval={100} />
      </div> :
        error ? <div className="flex items-center justify-center min-h-screen bg-gray-100"  >
          An error occurred. Please try reloading the page.
        </div> : null}

      {user?.role === 'investor' && investorProfile ? <InvestorProfile investorProfile={investorProfile} availableServiceTypes={availableServiceTypes} />
        : user?.role === 'advisor' && advisorProfile ? <AdvisorProfile advisorProfile={advisorProfile}
          availableServiceTypes={availableServiceTypes} availableQualifications={availableQualifications} />
          : null}
    </div>


  );
};

export default Profile;


