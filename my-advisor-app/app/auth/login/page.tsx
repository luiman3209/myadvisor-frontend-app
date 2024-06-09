"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Card } from '@/components/ui/card';
import ShakeableInput from '@/components/input/ShakableInput';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const { user, login, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setErrors('Invalid email or password');
      // wait for 2 seconds and then remove the error message
      setTimeout(() => {
        setErrors('');
      }, 3000);
    }

  };

  return (
    <main className=''>
      <div className="absolute top-0 left-0 p-4">
        <Link href="/">
          <Image
            src="/images/myadvisor-logo-black.svg"
            alt="Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row lg:min-h-[600px] xl:min-h-[800px] w-full ">
        <div className="flex items-center justify-center lg:w-1/2 py-12">
          <Card className='p-8'>
            <form onSubmit={handleSubmit} className="mx-auto w-[350px] space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Login</h1>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <ShakeableInput
                    value={email}
                    type="email"
                    placeholder="m@example.com"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} error={errors} animateOnly={true} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <ShakeableInput
                    type="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder={''} value={password} error={errors} />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm mt-4">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register/investor" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
          </Card>
        </div>
        <div className="hidden lg:block lg:w-1/2 bg-cyan-500">
          <Image
            src="/images/advisor_with_family.webp"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </main>
  );
}
