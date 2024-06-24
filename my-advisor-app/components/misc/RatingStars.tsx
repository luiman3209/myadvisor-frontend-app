import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
    initialRating: number;
    isInput?: boolean;
    setRating?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ initialRating, isInput = false, setRating }) => {
    const [selectedRating, setSelectedRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (index: number) => {
        if (isInput) {
            setHoverRating(index);
        }
    };

    const handleMouseLeave = () => {
        if (isInput) {
            setHoverRating(0);
        }
    };

    const handleClick = (index: number) => {
        if (isInput) {
            setSelectedRating(index);
            if (setRating) {
                setRating(index);
            }
        }
    };

    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((index) => (
                <Star
                    key={'star'.concat(Math.random().toString())}
                    className={`w-6 h-6 ${index <= (hoverRating || selectedRating) ? 'text-cyan-400' : 'text-gray-400'}`}
                    fill={index <= (hoverRating || selectedRating) ? 'currentColor' : 'none'}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};

export default RatingStars;
