// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { login, register, logout } from '../services/authService';
import { createOrUpdateAdvisor } from '../services/advisorService'; // Import advisor service
import { createOrUpdateInvestor } from '../services/investorService'; // Import investor service
import jwtDecode from '../utils/jwtDecode';
import { updateProfile } from '@/services/profileService';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, profileData: any, isAdvisor?: boolean) => Promise<void>; // Update register function signature
  error: string | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error('Failed to decode token', error);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const decodedUser = await login(email, password);
      setUser(decodedUser);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  const handleRegister = async (email: string, password: string, profileData: any, isAdvisor: boolean = true) => {
    setError(null);
    setLoading(true);
    try {

      let role;
      if (isAdvisor) {
        role = 'advisor';
      } else {
        role = 'investor';
      }

      const decodedUser = await register(email, password, role);

      if(decodedUser === null) {
        throw new Error('Registration failed');

      }


      setUser(decodedUser);

      await updateProfile({ ...profileData });

      // Create or update profile based on user type
      if (isAdvisor) {
        await createOrUpdateAdvisor({ ...profileData });
      } else {
        await createOrUpdateInvestor({ ...profileData });
      }

      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout, register: handleRegister, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
