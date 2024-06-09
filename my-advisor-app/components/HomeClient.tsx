// components/HomeClient.tsx
"use client";

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Bell, CalendarCheck, CalendarPlus, ChevronsUp, MessagesSquare, Rocket, Search, Star, StarHalf } from 'lucide-react';
import { Separator } from './ui/separator';
import { HomeReviewDto } from '@/types/types';
import RatingStars from './RatingStars';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import LineChart from './HomeBannerChart';
import BarChart from './HomeBannerChart';

interface HomeClientProps {
  serviceTypes: any[];
  latestReviews: HomeReviewDto[];
}

const HomeClient: React.FC<HomeClientProps> = ({ serviceTypes, latestReviews }) => {
  const [operatingCountryCode, setOperatingCountryCode] = useState('');
  const [selectedServiceName, setSelectedServiceName] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (operatingCountryCode) query.append('operating_country_code', operatingCountryCode);

    // find the service_id by selected service_name
    if (selectedServiceName) {
      serviceTypes.forEach((type) => {
        if (type.service_type_name === selectedServiceName) {
          query.append('service_id', type.service_id.toString());
        }
      });
    }

    router.push(`/advisor/explorer?${query.toString()}`);
  };

  return (
    <div className='flex flex-col min-h-screen bg-cyan-500'>
      <Navbar />
      <main className="flex-grow flex-col">

        {/* ********************** Main area ********************** */}

        <div className="p-12 bg-transparent relative">
          <div className="flex flex-col items-center md:mb-24">
            <div className='w-full md:w-8/12 lg:w-1/4 md:ml-96 mt-72 md:mt-48 lg:mt-0'>
              <img src="/images/subjects.png" alt="Subjects" className="w-full h-auto" />
            </div>
            <div className="absolute top-0 left-0  p-4 bg-transparent text-white px-12 md:px-36 lg:px-[400px] py-6 lg:py-[150px] lg:w-[1500px] ">
              <h1 className="text-3xl font-semibold mb-4">Book your appointment online!</h1>
              <p className="mb-6 text-xl font-base">Search among thousands of Financial Advisors.</p>
              <form onSubmit={handleSearch} className="mt-5">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <Input
                    type="text"
                    placeholder="Country Code"
                    value={operatingCountryCode}
                    onChange={(e) => setOperatingCountryCode(e.target.value)}
                    className="text-black text-base md:w-5/12"
                  />
                  <Select value={selectedServiceName || ''} onValueChange={(e) => setSelectedServiceName(e)}>
                    <SelectTrigger className="md:w-5/12 text-slate-600 text-base" >
                      <SelectValue placeholder="Service Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {serviceTypes.map((type) => (
                          <SelectItem className="text-base text-black" key={type.service_id} value={type.service_type_name}>
                            {type.service_type_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Button type="submit" className="md:w-2/12 p-2 mt-4 bg-cyan-200 hover:bg-cyan text-black text-base font-semibold rounded">
                    Search
                  </Button>
                </div>

              </form>
            </div>
          </div>
        </div>


        {/* ********************** White section ********************** */}

        <div className="flex flex-col md:px-96 bg-white">

          {/* ********************** Available services ********************** */}

          <CardHeader>
            <CardTitle>Available services by certified advisors</CardTitle>
            <CardDescription>Pick the service based on your needs.</CardDescription>
          </CardHeader>
          <CardContent className=' space-x-1 md:space-x-2 space-y-2'>
            {serviceTypes.map((type) => (
              <Button variant="outline" key={'button'.concat(type.service_id)}>
                {type.service_type_name}
              </Button>
            ))}
          </CardContent>

          <Separator className="my-4" />

          {/* ***************** CTAs ********************** */}

          <div className="flex flex-col md:flex-row my-6">
            <Card className="home-cta-card">

              <div className="home-cta-card-header">
                <CalendarPlus className="text-cyan-500 mr-1 w-8" />
                <span>Book a meeting: it&apos;s easy and free!</span>
              </div>
              <div className='home-cta-card-body'>
                <p>
                  Choose the date you prefer, enter your details, and confirm… the appointment is booked! There are no additional costs</p>

              </div>
            </Card>
            <Card className="home-cta-card">

              <div className="home-cta-card-header">
                <Search className="text-cyan-500 mr-1" />
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
                <MessagesSquare className="text-cyan-500 mr-1" />
                <span>Request consultation</span>
              </div>
              <div className='home-cta-card-body'>
                <p>
                  Get personalized financial guidance tailored to your needs. Request a consultation with a top-rated financial advisor today and take the first step towards a secure financial future.</p>

              </div>
            </Card>
            <Card className="home-cta-card">

              <div className="home-cta-card-header">
                <Bell className="text-cyan-500 mr-1" />
                <span>Email reminders</span>
              </div>
              <div className='home-cta-card-body'>
                <p className='home-cta-card-body'>
                  Stay on track with timely email reminders. Never miss an important consultation or update with your financial advisor, ensuring you always stay informed and prepared.</p>
              </div>
            </Card>


          </div>


          <Separator className="my-4" />

          {/* ********************** Reviews ********************** */}
          <div className='m-2'>
            <CardHeader>
              <CardTitle>Latest reviews</CardTitle>
              <CardDescription>Discover the latest feedback from our clients. See how our financial advisors are making a difference.</CardDescription>
            </CardHeader>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

              {latestReviews.map((review) => (


                <Card key={review.review_id} className="p-6 space-y-3">
                  <div className='flex flex-row'>
                    <div className='w-2/12'>
                      <Avatar>
                        <AvatarImage src={review.advisor_img_url} alt="advisor" />
                        <AvatarFallback>N/A</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className='w-10/12 space-y-2'>
                      <div className="flex space-x-2">
                        <Link href="" className='text-lg font-medium'>{review.advisor_display_name}</Link>
                        <div className=''>
                          <RatingStars rating={3} />
                        </div>
                      </div>
                      <div className='text-sm text-slate-800'>
                        <p >
                          {review.review}
                        </p>
                      </div>
                      <div className='text-slate-600 italic'>
                        <p>{review.reviewer_first_name}</p>
                      </div>
                    </div>

                  </div>

                </Card>

              ))}

            </div>
          </div>

          <Separator className="my-4" />

          {/* ********************** Advisor banner ********************** */}

          <div className='m-2 rounded-md bg-cyan-100 flex flex-col md:flex-row space-x-4'>

            <div className='relative md:w-1/2 p-2'>
              <img src="/images/office_bg_edite_banner.webp" alt="Subjects" className="rounded-md" />
              <div className='absolute top-6 left-4 shadow-xl w-56 h-auto'>

                <BarChart />
              </div>
              <div className='absolute bottom-6 left-32 rounded-lg bg-white flex flex-row items-center p-2 space-x-2 shadow-xl'>
                <div className='w-1/4'>
                  <div className='bg-cyan-100 font-semibold p-1 rounded'>
                    <span>4.7</span>
                  </div>
                </div>
                <div className='w-3/4'>
                  <div className='flex flex-col'>
                    <div className='text-lg font-semibold flex'>
                      <Star fill='currentColor' className="w-6 h-6 text-cyan-400" />
                      <Star fill='currentColor' className="w-6 h-6 text-cyan-400" />
                      <Star fill='currentColor' className="w-6 h-6 text-cyan-400" />
                      <Star fill='currentColor' className="w-6 h-6 text-cyan-400" />
                      <Star fill='currentColor' className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className='text-sm font-semibold'>General rating</div>
                    <div className='text-sm'>37 reviews</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='md:w-1/2 p-4 space-y-6'>
              <div>
                <h3 className='text-2xl font-bold'>Are you a financial advisor? Start connecting with new clients today!</h3>
              </div>

              <ul className='list-none p-0 m-0 space-y-8'>
                <li className='flex items-start mb-2 text-lg'><Rocket className="w-6 h-6 text-cyan-600 mt-1 mr-2 flex-shrink-0" /> Reach clients looking for a financial advisor in your area.</li>
                <li className='flex items-start mb-2 text-lg'><Rocket className="w-6 h-6 text-cyan-600 mt-1 mr-2 flex-shrink-0" /> Allow your clients to book appointments 24/7. Waiting for office hours? Not anymore!</li>
                <li className='flex items-start mb-2 text-lg'><Rocket className="w-6 h-6 text-cyan-600 mt-1 mr-2 flex-shrink-0" /> Boost your online reputation by getting verified reviews.</li>
              </ul>

              <Button className='bg-cyan-600 text-lg font-semibold hover:bg-cyan-400'> Discover MyAdvisor Pro </Button>
            </div>


          </div>

        </div >

      </main >
      <Footer />
    </div >
  );
};

export default HomeClient;
