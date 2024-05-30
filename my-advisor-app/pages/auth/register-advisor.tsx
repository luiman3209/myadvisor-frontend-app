import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getServiceTypes } from '@/services/serviceTypesService';

export default function RegisterAdvisor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [expertise, setExpertise] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [startShift1, setStartShift1] = useState('');
  const [endShift1, setEndShift1] = useState('');
  const [startShift2, setStartShift2] = useState('');
  const [endShift2, setEndShift2] = useState('');
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
      qualifications,
      expertise,
      contact_information: contactInformation,
      start_shift_1: startShift1,
      end_shift_1: endShift1,
      start_shift_2: startShift2,
      end_shift_2: endShift2,
      selected_service_types: selectedServiceTypes,
    }, true);
  };

  return (
    <div>
      <h1>Register as Advisor</h1>
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
          placeholder="Qualifications"
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expertise"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Information"
          value={contactInformation}
          onChange={(e) => setContactInformation(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Start Shift 1"
          value={startShift1}
          onChange={(e) => setStartShift1(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="End Shift 1"
          value={endShift1}
          onChange={(e) => setEndShift1(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Start Shift 2"
          value={startShift2}
          onChange={(e) => setStartShift2(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="End Shift 2"
          value={endShift2}
          onChange={(e) => setEndShift2(e.target.value)}
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
