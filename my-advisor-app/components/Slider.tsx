import React, { ReactNode } from 'react';

interface SliderProps {
    isOpen: boolean;
    children: ReactNode;
}

const Slider: React.FC<SliderProps> = ({ isOpen, children }) => {
    return (
        <div
            className={`transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            {children}
        </div>
    );
}

export default Slider;
