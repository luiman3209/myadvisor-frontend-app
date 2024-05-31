// contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, logout } from '../services/authService';
import { createOrUpdateAdvisor } from '../services/advisorService';
import { createOrUpdateInvestor } from '../services/investorService';
import { updateProfile } from '@/services/profileService';
import decodeToken, { DecodedToken } from '../utils/jwtDecode';
import { User, ProfileData } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, profileData: ProfileData, isAdvisor?: boolean) => Promise<void>;
  error: string | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = decodeToken(token);
        if (decodedUser) {
          setUser(decodedUser as User);
        }
      } catch (error) {
        console.error('Failed to decode token', error);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
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
  }, [router]);

  const handleLogout = useCallback(() => {
    logout();
    setUser(null);
    router.push('/');
  }, [router]);

  const handleRegister = useCallback(async (email: string, password: string, profileData: ProfileData, isAdvisor: boolean = true) => {
    setError(null);
    setLoading(true);
    try {
      const role = isAdvisor ? 'advisor' : 'investor';
      const decodedUser = await register(email, password, role);

      if (!decodedUser) {
        throw new Error('Registration failed');
      }

      setUser(decodedUser);
      await updateProfile(profileData.common_data);

      if (isAdvisor && profileData.advisor_data) {
        await createOrUpdateAdvisor(profileData.advisor_data);
      } else if(profileData.investor_data) {
        await createOrUpdateInvestor(profileData.investor_data);
      }

      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const value = React.useMemo(() => ({
    user,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    error,
    loading
  }), [user, handleLogin, handleLogout, handleRegister, error, loading]);

  return (
    <AuthContext.Provider value={value}>
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
