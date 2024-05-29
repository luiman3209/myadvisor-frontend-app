// pages/auth/register-investor.tsx
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RegisterInvestor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [netWorth, setNetWorth] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [financialGoals, setFinancialGoals] = useState('');
  const [geoPreferences, setGeoPreferences] = useState('');

  const { user, register, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email, password, {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address,
      net_worth: netWorth,
      income_range: incomeRange,
      financial_goals: financialGoals,
      geo_preferences: geoPreferences,
    }, false);
  };

  return (
    <div>
      <h1>Register as Investor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Net Worth"
          value={netWorth}
          onChange={(e) => setNetWorth(e.target.value)}
        />
        <input
          type="text"
          placeholder="Income Range"
          value={incomeRange}
          onChange={(e) => setIncomeRange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Financial Goals"
          value={financialGoals}
          onChange={(e) => setFinancialGoals(e.target.value)}
        />
        <input
          type="text"
          placeholder="Geographical Preferences"
          value={geoPreferences}
          onChange={(e) => setGeoPreferences(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
