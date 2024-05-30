import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getServiceTypes } from '@/services/serviceTypesService';

export default function RegisterInvestor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [netWorth, setNetWorth] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [geoPreferences, setGeoPreferences] = useState('');
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<number[]>([]);

  const { user, register, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }

    // Fetch service types
    const fetchServiceTypes = async () => {
      try {
        const types = await getServiceTypes();
        setServiceTypes(types);
      } catch (error) {
        console.error('Failed to fetch service types', error);
      }
    };

    fetchServiceTypes();
  }, [user, router]);

  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.options);
    const selected: number[] = [];
    options.forEach(option => {
      if (option.selected) {
        selected.push(Number(option.value));
      }
    });
    setSelectedServiceTypes(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email, password, {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address,
      net_worth: netWorth,
      income_range: incomeRange,
      geo_preferences: geoPreferences,
      selected_service_types: selectedServiceTypes,
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
          placeholder="Geographical Preferences"
          value={geoPreferences}
          onChange={(e) => setGeoPreferences(e.target.value)}
        />
        <select multiple onChange={handleServiceTypeChange}>
          {serviceTypes.map((type) => (
            <option key={type.service_id} value={type.service_id}>
              {type.service_type_name}
            </option>
          ))}
        </select>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
