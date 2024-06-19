

import { Card } from '../ui/card';


import { CalendarPlus, Search, MessagesSquare, Bell } from 'lucide-react';





const HomeCTAs = () => {
    return (
        <div className="flex flex-col bg-white">


            <div className="flex flex-col md:flex-row my-6">
                <Card className="home-cta-card">

                    <div className="home-cta-card-header">
                        <CalendarPlus className="text-cyan-500 mr-1 w-10 h-10" />
                        <span>Book a meeting: it&apos;s easy and free!</span>
                    </div>
                    <div className='home-cta-card-body md:h-[300px]'>
                        <p>
                            Choose the date you prefer, enter your details, and confirm… the appointment is booked! There are no additional costs</p>

                    </div>
                </Card>
                <Card className="home-cta-card">

                    <div className="home-cta-card-header">
                        <Search className="text-cyan-500 mr-1 w-10 h-10" />
                        <span>Find an advisor near you</span>
                    </div>
                    <div className='home-cta-card-body'>
                        <p>
                            Choose from over 200,000 financial advisors and specialists. Read reviews from other clients.
                        </p>

                    </div>
                </Card>
                <Card className="home-cta-card">

                    <div className="home-cta-card-header">
                        <MessagesSquare className="text-cyan-500 mr-1 w-8 h-8" />
                        <span>Request consultation</span>
                    </div>
                    <div className='home-cta-card-body'>
                        <p>
                            Get personalized financial guidance tailored to your needs. Request a consultation with a top-rated financial advisor today and take the first step towards a secure financial future.</p>

                    </div>
                </Card>
                <Card className="home-cta-card">

                    <div className="home-cta-card-header">
                        <Bell className="text-cyan-500 mr-1 w-8 h-8" />
                        <span>Email reminders</span>
                    </div>
                    <div className='home-cta-card-body'>
                        <p className='home-cta-card-body'>
                            Stay on track with timely email reminders. Never miss an important consultation or update with your financial advisor, ensuring you always stay informed and prepared.</p>
                    </div>
                </Card>


            </div>

        </div>
    );
};

export default HomeCTAs;
