import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import React, { ChangeEvent } from 'react';

interface ShakeableInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string; // Add className to the props
}

const shakeVariant = {
    shake: {
        x: [-3, 3, -3, 3, -3, 3, -3, 3, -3, 3, 0],
        transition: { duration: 0.7 }
    }
};

const ShakeableInput: React.FC<ShakeableInputProps> = ({ error, className, ...props }) => {
    return (
        <motion.div
            variants={shakeVariant}
            animate={error ? "shake" : ""}
            className="w-full"
        >
            <Input
                {...props}
                className={`${className} ${error ? 'border-red-500' : ''}`}
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </motion.div>
    );
};

export default ShakeableInput;
