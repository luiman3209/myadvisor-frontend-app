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
import { decodeQueryDataString, encodeQueryDataString } from '@/utils/commonUtils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user, login, error } = useAuth();
  const router = useRouter();

  useEffect(() => {


    const queryParams = new URLSearchParams(window.location.search);
    const encodedRedirect = queryParams.get('redirect') || '';
    try {
      if (encodedRedirect) {
        const decodedRedirect = decodeQueryDataString(encodedRedirect);
        setRedirect(decodedRedirect);
      }
    } catch (err) {
      console.error('Failed to decode redirect query string', err);
    }


  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setErrors('Please enter email and password');
        return;
      }
      await login(email, password);
      if (redirect) {
        router.push(redirect);
      } else {
        router.push('/');
      }
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

      <div className="flex flex-row w-full ">
        <div className="xl:w-1/2 ">
          <div className='p-4'>
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
          <div className='flex items-center justify-center h-3/4'>
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
                  <Button type="submit" className="bg-cyan-500 hover:bg-cyan-400 w-full">
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm mt-4">
                  Don&apos;t have an account?{" "}
                  <Link href={"/auth/register/investor?redirect=" + encodeQueryDataString(redirect)} className="underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </Card>
          </div>

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
