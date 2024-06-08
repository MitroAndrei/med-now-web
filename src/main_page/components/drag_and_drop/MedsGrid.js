// CardGrid.js
import React from 'react';
import Card from './Card';

const MedsGrid = ({ cards }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {cards.map((card) => (
                <Card key={card.id} id={card.id} text={card.text} />
            ))}
        </div>
    );
};

export default MedsGrid;
