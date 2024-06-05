


import React, { useState } from 'react';
import { Star } from 'lucide-react';


interface RatingStarsProps {
    rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {

    const [selectedRating, setSelectedRating] = useState(rating);


    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((index) => (
                <Star
                    key={index}
                    className={`w-6 h-6 ${index <= selectedRating ? 'text-cyan-400' : 'text-gray-400'
                        }`}

                    fill={index <= selectedRating ? 'currentColor' : 'none'}
                />
            ))}
        </div>
    );
};

export default RatingStars;

