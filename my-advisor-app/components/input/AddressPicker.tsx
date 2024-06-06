import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

// Define the structure of a suggestion
interface Suggestion {
    place_id: string;
    display_name: string;
    // Add other relevant fields if necessary
}

// Define the props for the AddressPicker component
interface AddressPickerProps {
    onAddressSelect: (address: string) => void;
}

const AddressPicker: React.FC<AddressPickerProps> = ({ onAddressSelect }) => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length > 2) {
            const response = await axios.get<Suggestion[]>(
                `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
            );
            setSuggestions(response.data);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setQuery(suggestion.display_name);
        setSuggestions([]);
        onAddressSelect(suggestion.display_name);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter address"
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
            {suggestions.length > 0 && (
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, border: '1px solid #ccc' }}>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.place_id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{ padding: '8px', cursor: 'pointer' }}
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressPicker;
