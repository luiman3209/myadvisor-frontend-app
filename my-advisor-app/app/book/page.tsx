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

    const [errors, setErrors] = useState('');
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
        }
    }, [user, router]);



    return (
        <main className=''>

        </main>
    );
}
