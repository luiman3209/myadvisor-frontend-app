// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';


const RegisterNavbar: React.FC = () => {
    return (
        <div className="flex justify-between p-5 bg-cyan-500">
            <Link href="/">
                <div className="flex items-center space-x-2">
                    <Image
                        src="/images/myadvisor-logo.png"
                        alt="Picture of the author"
                        width={50}
                        height={50}
                        className="flex-shrink-0"
                    />
                    <span className="text-2xl font-medium text-white">MyAdvisor</span>
                </div>
            </Link>
            <div className="flex items-center">
                <span className="mr-3 text-white">Already registered?</span>
                <Button className='bg-cyan-600'>Login</Button>
            </div>
        </div>
    );
}

export default RegisterNavbar;
