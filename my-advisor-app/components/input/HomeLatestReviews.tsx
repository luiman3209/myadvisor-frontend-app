
import React, { ChangeEvent } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import RatingStars from '../RatingStars';
import { HomeReviewDto } from '@/types/types';


interface HomeLatestReviewsProps {
    latestReviews: HomeReviewDto[];
}



const HomeLatestReviews: React.FC<HomeLatestReviewsProps> = ({ latestReviews }) => {
    return (
        <div className="flex flex-col md:px-32 bg-white ">
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
                                        <AvatarImage src={review.advisor.img_url} alt="advisor" />
                                        <AvatarFallback>review.user_config.profile.first_name[0]</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className='w-10/12 space-y-2'>
                                    <div className="flex space-x-2">
                                        <Link href="" className='text-lg font-medium'>{review.advisor.display_name}</Link>
                                        <div className=''>
                                            <RatingStars initialRating={review.rating} />
                                        </div>
                                    </div>
                                    <div className='text-sm text-slate-800'>
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
        </div>
    );
};

export default HomeLatestReviews;
