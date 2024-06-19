

import BarChart from '../HomeBannerChart';
import { Button } from '../ui/button';



import { Rocket, Star } from 'lucide-react';





const HomeAdvisorBanner = () => {
    return (
        <div className="flex flex-col md:px-32 bg-white ">
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
    );
};

export default HomeAdvisorBanner;
