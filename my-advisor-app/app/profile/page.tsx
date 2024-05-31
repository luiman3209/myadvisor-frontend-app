// app/profile/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getProfile } from '@/services/profileService';
import { getInvestorProfile } from '@/services/investorService';
import { getAdvisorProfile } from '@/services/advisorService';
import ProtectedRoute from '@/components/auth/ProtectedRoutes';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [investorProfile, setInvestorProfile] = useState<any>(null);
  const [advisorProfile, setAdvisorProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('user', user);
        const profileData = await getProfile();
        setProfile(profileData);

        if (user?.role === 'investor') {
          const investorData = await getInvestorProfile();
          setInvestorProfile(investorData);
        } else if (user?.role === 'advisor') {
          const advisorData = await getAdvisorProfile();
          setAdvisorProfile(advisorData);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProtectedRoute>
      <div>
        <h1>Your Profile</h1>
        {profile && (
          <div>
            <p>Email: {user?.email}</p>
            <p>Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
            {/* Add more common profile fields here */}
          </div>
        )}
        {user?.role === 'investor' && investorProfile && (
          <div>
            <h2>Investor Profile</h2>
            <p>Net Worth: {investorProfile.investor.net_worth}</p>
            <p>Income Range: {investorProfile.investor.income_range}</p>
            <p>Geographical Preferences: {investorProfile.investor.geo_preferences}</p>
            <h3>Services</h3>
            <ul>
              {investorProfile.serviceTypes.map((service: any) => (
                <li key={service.service_id}>{service.service_type_name}</li>
              ))}
            </ul>
            {/* Add more investor-specific fields here */}
          </div>
        )}
        {user?.role === 'advisor' && advisorProfile && (
          <div>
            <h2>Advisor Profile</h2>
            <p>Qualifications: {advisorProfile.advisor.qualifications}</p>
            <p>Expertise: {advisorProfile.advisor.expertise}</p>
            <p>Contact Information: {advisorProfile.advisor.contact_information}</p>
            <h3>Services</h3>
            <ul>
              {advisorProfile.serviceTypes.map((service: any) => (
                <li key={service.service_id}>{service.service_type_name}</li>
              ))}
            </ul>
            <h3>Reviews</h3>
            {advisorProfile.profileReviews.map((review: any) => (
              <div key={review.id}>
                <p>{review.text}</p>
                <p>By: {review.User.email}</p>
              </div>
            ))}
            {/* Add more advisor-specific fields here */}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
