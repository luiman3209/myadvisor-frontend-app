import React, { useEffect } from 'react';

interface BoxCollectionProps {
    items: string[];
}

const BoxCollection: React.FC<BoxCollectionProps> = ({ items }) => {


    return (
        <div className="flex flex-wrap rounded ">

            {items.map((item, index) => (

                <div
                    key={item}
                    className={index !== 0 ? "bg-cyan-500 text-white p-2 m-1 rounded shadow-md text-xs" : "bg-cyan-500 text-white p-2 my-1 mr-1 rounded shadow-md text-xs"}
                >
                    {item}
                </div>
            ))}
        </div>
    );
};

export default BoxCollection;
