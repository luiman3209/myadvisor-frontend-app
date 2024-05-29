// pages/profile.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { getProfile, updateProfile } from '@/services/profileService';
import ProtectedRoute from "@/components/ProtextedRoutes";


const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [preferences, setPreferences] = useState('');
  const [financialGoals, setFinancialGoals] = useState('');
  const [visibility, setVisibility] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profile = await getProfile();
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setPhoneNumber(profile.phone_number);
        setAddress(profile.address);
        setPreferences(profile.preferences);
        setFinancialGoals(profile.financial_goals);
        setVisibility(profile.visibility);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch profile');
        } else {
          setError('Failed to fetch profile');
        }
        console.error(err);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phoneNumber || !address || !financialGoals) {
      setError('Please fill all required fields.');
      return;
    }

    const profileData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address,
      preferences,
      financial_goals: financialGoals,
      visibility,
    };

    try {
      await updateProfile(profileData);
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Profile update failed');
      } else {
        setError('Profile update failed');
      }
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Create Your Profile</h1>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Preferences:</label>
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            />
          </div>
          <div>
            <label>Financial Goals:</label>
            <textarea
              value={financialGoals}
              onChange={(e) => setFinancialGoals(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Visibility:</label>
            <input
              type="checkbox"
              checked={visibility}
              onChange={(e) => setVisibility(e.target.checked)}
            />
          </div>
          <button type="submit">Save Profile</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default UserProfile;
