import React, { useState, useEffect } from 'react';

const CircularProgress = ({ size = 40, strokeWidth = 4, initialProgress = 0, interval = 100 }) => {
    const [progress, setProgress] = useState(initialProgress);
    const center = size / 2;
    const radius = center - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : 0));
        }, interval);
        return () => clearInterval(progressInterval);
    }, [interval]);

    return (
        <svg width={size} height={size} className="relative">
            <circle
                className="text-gray-300"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
            />
            <circle
                className="text-blue-500"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
        </svg>
    );
};

export default CircularProgress;
