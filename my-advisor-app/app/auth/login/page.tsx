"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { decodeQueryDataString, encodeQueryDataString } from '@/utils/commonUtils';
import { Home, User, UserCog } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user, login, error } = useAuth();
  const [logInConfirmed, setLogInConfirmed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && !logInConfirmed) {
      router.push('/profile');
    }
  });

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
        setTimeout(() => {
          setErrors('');
        }, 3000);
        return;
      }
      await login(email, password);
      setLogInConfirmed(true);
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

  const handleDemoInvestorLogin = async () => {

    try {


      const demoInvestorEmail = 'demo_investor_1@email.com';

      await login(demoInvestorEmail, demoInvestorEmail);
      setLogInConfirmed(true);
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

  const handleDemoAdvisorLogin = async () => {

    try {
      const demoAdvisorEmail = 'demo_advisor_1@email.com';
      await login(demoAdvisorEmail, demoAdvisorEmail);
      setLogInConfirmed(true);
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

      <div className="flex flex-row w-full min-h-screen ">
        <div className="w-full xl:w-1/2 ">
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
          <div className='flex items-center justify-center h-3/4 '>

            {/*<Card className='p-8 border-cyan-500 hover:border-cyan-400'>
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
            </Card> */}

            <Card className='p-8 border-cyan-500 hover:border-cyan-400'>
              <div className="flex flex-col mx-auto w-[350px] space-y-6 justify-center items-center">

                <CardHeader className='text-center'>
                  <CardTitle>Login with demo account</CardTitle>
                  <CardDescription>Login with the desired demo account type</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col space-y-4 justify-center items-center'>

                  <div className='flex flex-row'>

                    <Button onClick={() => handleDemoInvestorLogin()} className='bg-cyan-500 hover:bg-cyan-400'><User className='w-6 h-6 mr-2' />Login as Demo Investor</Button>
                  </div>
                  <div className='flex flex-row'>

                    <Button onClick={() => handleDemoAdvisorLogin()} className='bg-cyan-500 hover:bg-cyan-400'><UserCog className='w-6 h-6 mr-2' />Login as Demo Advisor</Button>
                  </div>

                  <div>
                    <Button className='bg-cyan-500 hover:bg-cyan-400' onClick={() => router.push("/")}>
                      <Home />
                    </Button>
                  </div>

                  <Link href="/privacy-policy" className="text-sm underline text-center">
                    Privacy Policy
                  </Link>

                  {errors &&
                    <div className='border border-red-500 bg-red-100 text-black text-sm p-2 rounded'>
                      {errors}
                    </div>}

                </CardContent>

              </div>
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
