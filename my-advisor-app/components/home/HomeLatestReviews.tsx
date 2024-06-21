
import React, { ChangeEvent } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import RatingStars from '../misc/RatingStars';
import { HomeReviewDto } from '@/types/types';


interface HomeLatestReviewsProps {
    latestReviews: HomeReviewDto[];
}



const HomeLatestReviews: React.FC<HomeLatestReviewsProps> = ({ latestReviews }) => {
    return (

        <div className='m-2 md:px-16 lg:px-56 2xl:px-72 justify-center'>
            <CardHeader>
                <CardTitle>Latest reviews</CardTitle>
                <CardDescription>Discover the latest feedback from our clients. See how our financial advisors are making a difference.</CardDescription>
            </CardHeader>

            <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6'>

                {latestReviews.map((review) => (


                    <Card key={review.review_id} className="p-6 space-y-3 ">
                        <div className='flex flex-row'>
                            <div className='w-2/12 mr-4'>
                                <Avatar className='w-12 h-12'>
                                    <AvatarImage src={review.advisor.img_url} alt="advisor" />
                                    <AvatarFallback>{review.user_config.profile.first_name[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className='w-10/12 space-y-2'>
                                <div className="space-y-2">
                                    <Link href="" className='text-lg font-medium'>{review.advisor.display_name}</Link>
                                    <div className=''>
                                        <RatingStars initialRating={review.rating} />
                                    </div>
                                </div>
                                <div className='text-sm text-slate-800 h-1/4'>
                                    <p >
                                        {review.review}
                                    </p>
                                </div>
                                <div className='text-slate-600 italic'>
                                    <p>{review.user_config.profile.first_name}</p>
                                </div>
                            </div>

                        </div>

                    </Card>

                ))}

            </div>
        </div>

    );
};

export default HomeLatestReviews;
