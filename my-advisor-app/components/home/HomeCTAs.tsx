

import { Card } from '../ui/card';


import { CalendarPlus, Search, MessagesSquare, Bell } from 'lucide-react';





const HomeCTAs = () => {
    return (
        <>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-8  justify-center lg:px-64  ">

                <Card className="p-6 h-72">

                    <div className="flex flex-row space-x-2 font-semibold text-lg h-1/4 mb-1.5">
                        <CalendarPlus className="text-cyan-500 mr-1 w-10 h-10" />
                        <span>Book a meeting: it&apos;s easy and free!</span>
                    </div>
                    <div className='text-slate-600 md:h-[300px]'>
                        <p>
                            Choose the date you prefer, enter your details, and confirm… the appointment is booked! There are no additional costs</p>

                    </div>
                </Card>
                <Card className="p-6 h-72">

                    <div className="flex flex-row space-x-2 font-semibold text-lg h-1/4 mb-1.5">
                        <Search className="text-cyan-500 mr-1 w-8 h-8" />
                        <span>Find an advisor near you</span>
                    </div>
                    <div className='text-slate-600'>
                        <p>
                            Choose from over 200,000 financial advisors and specialists. Read reviews from other clients.
                        </p>

                    </div>
                </Card>
                <Card className="p-6 h-72">

                    <div className="flex flex-row space-x-2 font-semibold text-lg h-1/4 mb-1.5">
                        <MessagesSquare className="text-cyan-500 mr-1 w-8 h-8" />
                        <span>Request consultation</span>
                    </div>
                    <div className='text-slate-600'>
                        <p>
                            Get personalized financial guidance tailored to your needs. Request a consultation with a top-rated financial advisor today and take the first step towards a secure financial future.</p>

                    </div>
                </Card>
                <Card className="p-6 h-72">

                    <div className="flex flex-row space-x-2 mb-1.5 font-semibold text-lg h-1/4 mb-1.5">
                        <Bell className="text-cyan-500 mr-1 w-8 h-8" />
                        <span>Email reminders</span>
                    </div>
                    <div className='text-slate-600'>
                        <p >
                            Stay on track with timely email reminders. Never miss an important consultation or update with your financial advisor, ensuring you always stay informed and prepared.</p>
                    </div>
                </Card>




            </div>
        </>

    );
};

export default HomeCTAs;
