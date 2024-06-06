import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Import the AddressPicker component
const AddressPicker = dynamic(() => import('../components/input/AddressPicker'), {
    ssr: false,
});

const AddressPickerPage: React.FC = () => {
    const [selectedAddress, setSelectedAddress] = useState<string>('');

    const handleAddressSelect = (address: string) => {
        setSelectedAddress(address);
    };

    return (
        <div>
            <h1>Select Address</h1>
            <AddressPicker onAddressSelect={handleAddressSelect} />
            {selectedAddress && (
                <div>
                    <h2>Selected Address:</h2>
                    <p>{selectedAddress}</p>
                </div>
            )}
        </div>
    );
};

export default AddressPickerPage;
