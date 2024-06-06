"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Import the AddressPicker component
const AddressPicker = dynamic(() => import('../../components/input/AddressPicker'), {
    ssr: false,
});

const AddressPickerPage: React.FC = () => {
    const [selectedAddress, setSelectedAddress] = useState<string>('');

    const handleAddressSelect = (address: string) => {
        setSelectedAddress(address);
    };

    return (
        <div>

            {selectedAddress ?
                <div>
                    <h2>Selected Address:</h2>
                    <p>{selectedAddress}</p>
                </div>
                : <AddressPicker onAddressSelect={handleAddressSelect} />}
        </div>
    );
};

export default AddressPickerPage;
