import React from 'react';
import './DemoBanner.css';
import { TriangleAlert } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from 'next/link';
import { Button } from '../ui/button';

const DemoBanner = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full z-50">
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-300 py-3 px-6 text-white text-center shadow-lg demo-banner md:text-xl md:max-h-12">
                <div className='flex items-center justify-center'>
                    <TriangleAlert className='w-7 h-7 mr-2' />
                    <div className='font-semibold'>
                        This is a demo site. No real data is being used, all profiles are fictional, and some links may not be available.
                    </div>
                    <div>
                        <AlertDialog>
                            <AlertDialogTrigger className='ml-2 underline'>Learn more...</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader >
                                    <AlertDialogTitle>MyAdvisor Demo by Luigi Mangione</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <ul className="list-disc pl-4">
                                            <li>This website is a demo. All profiles are fictional, and some links may not be available.</li>
                                            <li>In order to try private functionalities you need to be logged in.</li>
                                            <li>You are free to register as an advisor or investor by confirming your email, but all your data will be erased after 1 hour for your privacy and security.</li>
                                            <li>You can also log in using the public user button shown on the login page.</li>
                                            <li>Once logged in, you are free to use the appointment booking and review systems.</li>
                                        </ul>



                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Button className='flex items-center justify-start text-sm bg-transparent hover:bg-transparent text-black '>

                                        <Link href="/privacy-policy" target="_blank" className='underline '>

                                            Privacy Policy

                                        </Link>
                                    </Button>
                                    <Button className=''><Link href="https://luiman3209.github.io/" target="_blank" className=''>

                                        Check out my website

                                    </Link></Button>
                                    <AlertDialogAction className='bg-cyan-500 hover:bg-cyan-400'>Continue</AlertDialogAction>

                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoBanner;
