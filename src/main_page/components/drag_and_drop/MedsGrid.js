import React from 'react';
import Card from './Card';
import SearchBar from "../search_patients/SearchBar";

const MedsGrid = ({cards, handleSearch}) => {

    return (
        <>
            <SearchBar onSearch={handleSearch}/>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '8px',
                justifyContent: 'center',
                padding: '8px'
            }}>
                {cards.map((card) => (
                    <Card key={card.id} id={card.id} text={card.text}/>
                ))}
            </div>
        </>
    );
};

export default MedsGrid;
